import { CommonModule } from '@angular/common'
import { Component, effect, input, signal } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoryGrouping, DataSelect, Ecosolutions } from '@goeko/store'
import { UiSuperSelectModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { defaultSetReductions } from '../compare-with-select'

@Component({
  selector: 'goeko-ecosolutions-form-benefis',
  standalone: true,
  imports: [CommonModule, UiSuperSelectModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './ecosolutions-form-benefis.component.html',
  styleUrl: './ecosolutions-form-benefis.component.scss',
})
export class EcosolutionsFormBenefisComponent {
  public defaultSetReductions = defaultSetReductions
  public dataOperationalCostReduction = signal(DataSelect.operationalCostReduction)
  public dataReductionPercentage = signal(DataSelect.reductionPercentage)
  public parentForm = input.required<FormGroup>()
  public categoryCode = input.required<string>()
  public categories = input<CategoryGrouping[]>()
  public ecosolutionsBenefits = input<Ecosolutions>()
  public addOtherBenefit = signal(false)
  effectLoadEcosolutionsBenefits = effect(() => {
    if (this.ecosolutionsBenefits()) {
      this._patchEcosolutionsBenefitsValue()
    }
  })
  effetLoadCategories = effect(() => {
    if (this.addOtherBenefit()) {
      const firstCategory = this.categories()
        ?.filter((c) => c.code !== this.categoryCode())
        ?.at(0)
      this.parentForm().get('improvementOtherCategory')?.get('category')?.patchValue(firstCategory?.code)
    }
  })

  addOtherCategory() {
    this.addOtherBenefit.set(true)
  }
  private _patchEcosolutionsBenefitsValue() {
    if (!this.ecosolutionsBenefits()) {
      return
    }
    this.parentForm().get('reductionPercentage')?.patchValue(this.ecosolutionsBenefits()?.improvement?.reductionPercentage)
    this.parentForm()
      .get('operationalCostReductionPercentage')
      ?.patchValue(this.ecosolutionsBenefits()?.improvement?.operationalCostReductionPercentage)
  }
}
