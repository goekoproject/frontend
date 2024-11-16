import { CommonModule } from '@angular/common'
import { Component, computed, inject, input, OnInit, signal } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import {
  CanComponentDeactivate,
  canDeactivateForm,
  CATEGORIES,
  CategoryModule,
  SelectSubcategoryProductComponent,
} from '@goeko/business-ui'
import { Category, Product, Project } from '@goeko/store'
import { BadgeModule, ButtonModule, DialogMessageModule } from '@goeko/ui'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { Observable, of } from 'rxjs'
import { ProjectEcosolutionParams } from '../project-ecosolutions-query.model'
import { ProjectForm } from '../project-form.model'
import { ProjectManagmentService } from '../project-managment.service'
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
    DialogMessageModule,
  ],
  providers: [ProjectManagmentService],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit, CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean = () => {
    return this._submitter() ? of(true) : canDeactivateForm(this._saveProjects)
  }

  compareWithProducts = compareWithProducts
  private _submitter = signal(false)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _fb = inject(FormBuilder)
  private _translateService = inject(TranslateService)
  private _projectManagmentServices = inject(ProjectManagmentService)
  public smeId = input<string>()
  public project = input.required<Project>()
  public groupingForm = input.required<Category[]>()

  public categorySelected = signal<Category | undefined>(undefined)
  public indexCategorySelected = computed(() => {
    return this.groupingForm()?.findIndex((category) => category?.code === this.categorySelected()?.code) || 0
  })
  public form!: FormGroup
  ngOnInit(): void {
    this._initForm()
    this.categorySelected.set(this.groupingForm()[0])
    this._setDataForm()
    this._changeLang()
  }
  private _changeLang() {
    this._translateService.onLangChange.subscribe((res) => {
      this._fetchData(res.lang)
    })
  }
  private _fetchData(lang: string) {
    this._router.navigate([], {
      relativeTo: this._router.routerState.root,
      queryParams: { lang: lang },
    })
  }

  private _setDataForm() {
    if (this.project()) {
      const projectFormValue = ProjectForm.transform(this.project().classifications || [])
      this.form.patchValue(projectFormValue)
    }
  }

  private _initForm() {
    const categoryGroups = this._buildFormGroupsCategories()
    const locations = this._fb.array([])

    if (categoryGroups) {
      this.form = this._fb.group(categoryGroups)
    }
    this.form.addControl('locations', locations)
  }

  private _buildFormGroupsCategories() {
    return this.groupingForm()?.reduce(
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
  }
  selectCategory(category: Category) {
    this.categorySelected.set(category)
  }
  nextCategory() {
    const nextIndex = this.indexCategorySelected() + 1
    if (nextIndex >= 0 && nextIndex < this.groupingForm().length) {
      const nextCategory = this.groupingForm()?.at(nextIndex) as Category
      this.selectCategory(nextCategory)
    }
  }
  prevCategory() {
    const prevIndex = this.indexCategorySelected() - 1
    if (prevIndex >= 0 && prevIndex < this.groupingForm().length) {
      const prevCategory = this.groupingForm()?.at(prevIndex) as Category
      this.selectCategory(prevCategory)
    }
  }

  addProduct(subcategoryCode: string, products: Product[]) {
    const categoryCode = this.categorySelected()?.code || CATEGORIES.CO2_EMISSION
    const productCode = products.map((p) => p.code)
    this.form.get(categoryCode)?.get(subcategoryCode)?.patchValue(productCode)
  }

  searchEcosolutions() {
    this._saveProjects().subscribe((res) => {
      this._submitter.set(res)
      if (res) {
        this._router.navigate(['search', this.smeId(), this.project().id], { relativeTo: this._route.parent })
      }
    })
  }

  protected _saveProjects = () => {
    const payload = new ProjectEcosolutionParams({
      ...this.form.value,
      name: this.project().name,
      locations: this.project().locations,
      notification: this.project().notification,
    })

    return this._projectManagmentServices.updateProject(this.project().id, payload)
  }
}
