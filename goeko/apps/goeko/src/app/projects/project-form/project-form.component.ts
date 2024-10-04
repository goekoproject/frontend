import { CommonModule } from '@angular/common'
import { Component, computed, inject, input, OnInit, signal } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CATEGORIES, CategoryModule, SelectSubcategoryProductComponent } from '@goeko/business-ui'
import { Category, Product, Project, ProjectService } from '@goeko/store'
import { BadgeModule, ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { CountProductsPipe } from '../count-products.pipe'
import { ProjectForm } from '../project-form.model'
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
    CountProductsPipe,
  ],
  providers: [],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit {
  compareWithProducts = compareWithProducts

  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _projectServices = inject(ProjectService)
  private _fb = inject(FormBuilder)

  public smeId = input<string>('')
  project = input.required<Project>()
  groupingForm = input.required<Category[]>()

  public categorySelected = signal<Category | undefined>(undefined)
  public indexCategorySelected = computed(() => {
    return this.groupingForm()?.findIndex((category) => category?.code === this.categorySelected()?.code) || 0
  })
  public form!: FormGroup
  ngOnInit(): void {
    this._initForm()
    this.categorySelected.set(this.groupingForm()[0])
    this._setDataForm()
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
  }

  searchEcosolutions() {
    this._projectServices.setProjectQuery({ ...this.form.value, locations: this.project().locations })
    this._router.navigate(['search', this.smeId(), this.project().id], { relativeTo: this._route.parent })
  }
}
