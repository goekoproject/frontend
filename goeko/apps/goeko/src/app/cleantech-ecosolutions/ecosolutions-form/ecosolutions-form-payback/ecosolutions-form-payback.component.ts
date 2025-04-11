import { CommonModule } from '@angular/common'
import { Component, effect, input, signal } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { DataSelect } from '@goeko/store'
import { UiSuperSelectModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { defaultSetPaybackPeriodYears } from '../compare-with-select'

@Component({
  selector: 'goeko-ecosolutions-form-payback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiSuperSelectModule, TranslatePipe],
  templateUrl: './ecosolutions-form-payback.component.html',
  styleUrl: './ecosolutions-form-payback.component.scss',
})
export class EcosolutionsFormPaybackComponent {
  public parentForm = input.required<FormGroup>()
  public ecosolutionsPayback = input.required<number | undefined>()

  public defaultSetPaybackPeriodYears = defaultSetPaybackPeriodYears
  public paybackPeriodYears = signal(DataSelect.paybackPeriodYears)

  effectLoadPayback = effect(() => {
    if (!this.ecosolutionsPayback()) {
      return
    }
    this.parentForm().get('paybackPeriodYears')?.setValue(this.ecosolutionsPayback())
  })
}
