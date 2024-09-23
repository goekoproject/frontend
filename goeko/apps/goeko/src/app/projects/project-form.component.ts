import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { CATEGORIES, CategoryModule, SelectSubcategoryProductComponent } from '@goeko/business-ui'
import { Category, Product, ProjectService } from '@goeko/store'
import { BadgeModule, ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { tap } from 'rxjs'
import { ProjectForm } from './project-form.model'
import { CountProductsPipe } from './count-products.pipe'
const compareWithProducts = (product: Product, productCodeSelected: Product | string | any) => {
  return product.code === productCodeSelected?.code || product.code === productCodeSelected
}
@Component({
  selector: 'goeko-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule,
    CategoryModule,
    BadgeModule,
    SelectSubcategoryProductComponent,
    ReactiveFormsModule,
    CountProductsPipe
  ],
  providers: [ProjectService],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  compareWithProducts = compareWithProducts

  private _router = inject(ActivatedRoute)
  private _projectService = inject(ProjectService)
  private _fb = inject(FormBuilder)
  private _projectId = signal(this._router.snapshot.params['projectId'])
  private _smeId = signal(this._router.snapshot.params['smeId'])
  private loadFormEffect = effect(() => {
    if (this.project()) {
      this._initForm2()
      if (this.form) {
        const projectFormValue = ProjectForm.transform(this.project()?.classifications || [])
        this.form.patchValue(projectFormValue)
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

  public getSubcategoryProducts(code: string) {
    const categoryCode = this.categorySelected()?.code
    if (categoryCode) {
      const categoryControl = this.form.get(categoryCode)
      if (categoryControl) {
        return categoryControl.get(code) as FormGroup
      }
    }
    return null
  }
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
            subAcc[subcategory.code] = this._fb.control([])
            return subAcc
          },
          {} as { [key: string]: FormControl },
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

  addProduct(subcategoryCode: string, products: Product[]) {
    const categoryCode = this.categorySelected()?.code || CATEGORIES.CO2_EMISSION
    const productCode = products.map((p) => p.code)
    this.form.get(categoryCode)?.get(subcategoryCode)?.patchValue(productCode)

    if (categoryCode) {
      console.log(this.form.value[categoryCode][subcategoryCode])
    }
  }
}
