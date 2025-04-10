import { Component, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiSuperSelectModule } from '@goeko/ui'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslatePipe } from '@ngx-translate/core'
import { defaultSetReductions } from '../compare-with-select'
import { DataSelect } from '@goeko/store'

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
  parentForm = input.required<FormGroup>()
  categoryCode = input.required<string>()
  isReadOnly = input<boolean>(false)
}
