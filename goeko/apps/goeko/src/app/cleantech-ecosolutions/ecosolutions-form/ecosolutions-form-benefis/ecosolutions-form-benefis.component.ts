import { CommonModule } from '@angular/common'
import { Component, effect, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { DataSelect, Ecosolutions } from '@goeko/store'
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
  public dataSelect = DataSelect
  public parentForm = input.required<FormGroup>()
  public categoryCode = input.required<string>()
  public ecosolutionsBenefits = input<Ecosolutions>()

  effectLoadEcosolutionsBenefits = effect(() => {
    if (this.ecosolutionsBenefits()) {
      this._patchEcosolutionsBenefitsValue()
    }
  })
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
