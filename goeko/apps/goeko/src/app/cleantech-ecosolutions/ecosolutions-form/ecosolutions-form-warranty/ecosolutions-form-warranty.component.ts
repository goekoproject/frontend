import { CommonModule } from '@angular/common'
import { Component, computed, input, OnInit } from '@angular/core'
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DataSelect } from '@goeko/store'
import { UiSuperSelectModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { defaultSetyearGuarantee } from '../compare-with-select'

@Component({
  selector: 'goeko-ecosolutions-form-warranty',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule, UiSuperSelectModule],
  templateUrl: './ecosolutions-form-warranty.component.html',
  styleUrl: './ecosolutions-form-warranty.component.scss',
})
export class EcosolutionsFormWarrantyComponent implements OnInit {
  public defaultSetyearGuarantee = defaultSetyearGuarantee
  public dataSelect = DataSelect

  parentForm = input.required<FormGroup>()
  isReadOnly = input<boolean>(false)
  hasError = computed(() => (this.parentForm().get('yearGuarantee')?.invalid && this.parentForm().get('yearGuarantee')?.touched) || false)

  ngOnInit(): void {
    this._changeGuarantee()
  }
  private _changeGuarantee() {
    this.parentForm()
      .get('guarantee')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.parentForm().get('yearGuarantee')?.setValidators(Validators.required)
          this.parentForm().get('yearGuarantee')?.markAsDirty()
        } else {
          this.parentForm().get('yearGuarantee')?.clearValidators()
          this.parentForm().get('yearGuarantee')?.reset()
        }
        this.parentForm().get('yearGuarantee')?.updateValueAndValidity()
      })
  }
}
