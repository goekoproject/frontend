import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { SubcategoryGrouping } from '@goeko/store'
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcosolutionsFormEcosolutionTypeComponent implements OnInit {
  private _fb = inject(FormBuilder)

  public defaultSetProductsCategories = defaultSetProductsCategories

  public questionsCategories = input.required<SubcategoryGrouping[]>()
  public ecosolutionsClassifications = input<ClassificationManagment[]>()

  public parentForm = input.required<FormGroup>()
  public categoryCode = input.required<string>()

  public classifications = computed(() => this.parentForm().get('classifications') as FormArray)
  effectLoadDataEcosolutions = effect(() => {
    if (this.ecosolutionsClassifications() && this.classifications().length > 0) {
      this._patchClassificationsValue()
    }
  })

  ngOnInit(): void {
    if (this.questionsCategories()) {
      this._initFormClassifications()
    }
  }

  private _initFormClassifications() {
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

  private _patchClassificationsValue() {
    if (!this.ecosolutionsClassifications() || !this.parentForm()) {
      return
    }
    this.ecosolutionsClassifications()?.forEach((classification) => {
      const productsCode = classification.products.map((p) => p.code) || []
      const controls = this.classifications().controls.find(
        (c) => c.value.subCategory === classification.subcategory.code && c.value.category === classification.category.code,
      )
      if (controls && productsCode.length > 0) {
        controls.get('products')?.patchValue(productsCode)
      }
    })
  }
}
