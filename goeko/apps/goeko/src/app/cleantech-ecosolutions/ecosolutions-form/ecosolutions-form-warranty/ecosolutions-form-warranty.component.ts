import { CommonModule } from '@angular/common'
import { Component, computed, effect, input, OnInit, signal } from '@angular/core'
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DataSelect, Ecosolutions } from '@goeko/store'
import { UiSuperSelectModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-ecosolutions-form-warranty',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule, UiSuperSelectModule],
  templateUrl: './ecosolutions-form-warranty.component.html',
  styleUrl: './ecosolutions-form-warranty.component.scss',
})
export class EcosolutionsFormWarrantyComponent implements OnInit {
  public dataYearGuarantee = signal(DataSelect.yearGuarantee)

  public parentForm = input.required<FormGroup>()
  public ecosolutionsData = input<Ecosolutions>()
  public hasError = computed(
    () => (this.parentForm().get('yearGuarantee')?.invalid && this.parentForm().get('yearGuarantee')?.touched) || false,
  )

  effectLoadWarranty = effect(() => {
    if (this.ecosolutionsData()) {
      this.parentForm().get('guarantee')?.patchValue(this.ecosolutionsData()?.guarantee)
      this.parentForm().get('yearGuarantee')?.patchValue(this.ecosolutionsData()?.guaranteeInYears)
    }
  })
  ngOnInit(): void {
    this._changeGuarantee()
  }
  private _changeGuarantee() {
    this.parentForm()
      .get('guarantee')
      ?.valueChanges.subscribe((value) => {
        const yearGuaranteeControl = this.parentForm().get('yearGuarantee')
        if (value) {
          yearGuaranteeControl?.enable()
          yearGuaranteeControl?.setValidators(Validators.required)
          yearGuaranteeControl?.markAsDirty()
        } else {
          yearGuaranteeControl?.disable()
          yearGuaranteeControl?.clearValidators()
          yearGuaranteeControl?.reset()
        }
        yearGuaranteeControl?.updateValueAndValidity()
      })
  }
}
