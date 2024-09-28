import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { DialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-request-demo-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './request-demo-dialog.component.html',
  styleUrl: './request-demo-dialog.component.scss',
})
export class RequestDemoDialogComponent {
  private _dialogService = inject(DialogService)

  closeDialog(isAccepted: boolean = false) {
    this._dialogService.close(isAccepted)
  }
}
