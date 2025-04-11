import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoryGrouping } from '@goeko/store'
import { ClassificationManagment } from '@goeko/store/model/classifications-managment.interface'
import { BadgeModule, FormErrorTextComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { defaultSetProductsCategories } from '../compare-with-select'

@Component({
  selector: 'goeko-ecosolutions-form-ecosolution-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BadgeModule, FormErrorTextComponent, TranslatePipe],
  templateUrl: './ecosolutions-form-ecosolution-type.component.html',
  styleUrl: './ecosolutions-form-ecosolution-type.component.scss',
})
export class EcosolutionsFormEcosolutionTypeComponent {
  private _fb = inject(FormBuilder)

  public defaultSetProductsCategories = defaultSetProductsCategories

  public groupingForm = input.required<CategoryGrouping[]>()
  public ecosolutionsClassifications = input<ClassificationManagment[]>()

  public questionsCategories = computed(() => this.groupingForm()?.find((category) => category.code === this.categoryCode())?.subcategories)

  public parentForm = input.required<FormGroup>()
  public categoryCode = input.required<string>()
  public isReadOnly = input<boolean>(false)

  public classifications = computed(() => this.parentForm().get('classifications') as FormArray)

  effectInitFormClassifications = effect(() => {
    if (this.questionsCategories()) {
      this.questionsCategories()?.forEach((subcategory) => {
        this.classifications().push(
          this._fb.group({
            category: [this.categoryCode()],
            subCategory: [subcategory.code],
            products: [],
          }),
        )
      })
    }
  })
  effectLoadDataEcosolutions = effect(() => {
    if (this.ecosolutionsClassifications()) {
      this._patchClassificationsValue()
    }
  })
  private _patchClassificationsValue() {
    if (!this.ecosolutionsClassifications()) {
      return
    }
    this.ecosolutionsClassifications()?.forEach((classification, index) => {
      this.classifications()
        .at(index)
        ?.get('products')
        ?.setValue(classification.products.map((product) => product.code))
    })
  }
}
