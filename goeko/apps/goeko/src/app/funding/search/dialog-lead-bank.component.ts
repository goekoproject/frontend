import { CommonModule } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule, DialogService, GoekoButtonModule, GoInputComponent, OVERLAY } from '@goeko/ui'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

export interface DataLeadBank {
  financingTye: string
  bankName: string
}
@Component({
  selector: 'goeko-dialog-lead-bank',
  standalone: true,
  imports: [CommonModule, GoInputComponent, TranslatePipe, ButtonModule, GoekoButtonModule, ReactiveFormsModule],
  templateUrl: './dialog-lead-bank.component.html',
  styleUrl: './dialog-lead-bank.component.scss',
})
export class DialogLeadBankComponent {
  private _dialogService = inject(DialogService)
  private _translateService = inject(TranslateService)
  private _data = inject<DataLeadBank>(OVERLAY, { optional: true })
  private _defaultMessage = this._translateService.instant('messageLeadForBank')
  public message = new FormControl(this._defaultMessage, Validators.required)
  public data = computed(() => this._data)

  sendMessage() {
    this._dialogService.close(this.message.value)
  }

  close() {
    this._dialogService.close(null)
  }
}
