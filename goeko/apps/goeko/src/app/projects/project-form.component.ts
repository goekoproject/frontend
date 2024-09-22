import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { CategoryModule, SelectSubcategoryProductComponent } from '@goeko/business-ui'
import { Category, ProjectService } from '@goeko/store'
import { BadgeModule, ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { tap } from 'rxjs'

@Component({
  selector: 'goeko-project-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, CategoryModule, BadgeModule, SelectSubcategoryProductComponent],
  providers: [ProjectService],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  private _router = inject(ActivatedRoute)
  private _projectService = inject(ProjectService)
  private _fb = inject(FormBuilder)
  private _projectId = signal(this._router.snapshot.params['projectId'])
  private _smeId = signal(this._router.snapshot.params['smeId'])
  private loadFormEffect = effect(() => {
    if (this.project()) {
      this._initForm2()
      if (this.form) {
        this.form.patchValue(this.project()?.classifications as any)
        console.log(this.form)
      }
    }
  })
  public project = toSignal(
    this._projectService.getProjectId({ smeId: this._smeId(), projectId: this._projectId() }).pipe(
      tap((project) => {
        if (project) {
          this.loadFormEffect
        }
      }),
    ),
    {
      initialValue: null,
    },
  )

  public groupingForm = toSignal<Category[]>(
    this._projectService.getGroupingFormCategories().pipe(
      tap((categories) => {
        if (categories.length > 0) {
          this.categorySelected.set(categories[0])
        }
      }),
    ),
    {
      initialValue: null,
    },
  )

  public categorySelected = signal<Category | undefined>(undefined)
  public indexCategorySelected = computed(() => {
    return this.groupingForm()?.findIndex((category) => category?.code === this.categorySelected()?.code) || 0
  })
  public form!: FormGroup
  private _initForm() {
    this.form = this._fb.group({
      co2Emission: this._fb.group({}),
      waste: this._fb.group({}),
      waterConsumption: this._fb.group({}),
      hazardousProduct: this._fb.group({}),
      notification: this._fb.group({
        onNewEcosolution: this._fb.control(false),
      }),
    })
  }

  private _initForm2() {
    const categoryGroups = this.groupingForm()?.reduce(
      (acc, category) => {
        const subcategoryGroups = category.subcategories.reduce(
          (subAcc, subcategory) => {
            const productControls = subcategory.products.reduce(
              (prodAcc, product) => {
                prodAcc[product.code] = new FormControl(false)
                return prodAcc
              },
              {} as { [key: string]: FormControl },
            )

            subAcc[subcategory.code] = this._fb.group(productControls)
            return subAcc
          },
          {} as { [key: string]: FormGroup },
        )

        acc[category.code] = this._fb.group(subcategoryGroups)
        return acc
      },
      {} as { [key: string]: FormGroup },
    )
    if (categoryGroups) {
      this.form = this._fb.group(categoryGroups)
    }
  }
  selectCategory(category: Category) {
    this.categorySelected.set(category)
  }
  nextCategory() {
    const nextIndex = this.indexCategorySelected() + 1
    const nextCategory = this.groupingForm()?.at(nextIndex)
    if (nextCategory) {
      this.selectCategory(nextCategory)
    }
  }
  prevCategory() {
    const prevIndex = this.indexCategorySelected() - 1
    const prevCategory = this.groupingForm()?.at(prevIndex)
    if (prevCategory) {
      this.selectCategory(prevCategory)
    }
  }
}
