import { AfterViewInit, Component, ElementRef, Optional, ViewChild } from '@angular/core'
import { DialogMessageService } from './dialog-message.service'
import { UIDialogRef } from './ui-dialog-ref'

@Component({
  selector: 'goeko-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.scss',
})
export class DialogMessageComponent implements AfterViewInit {
  @ViewChild('dialogMsg') dialogMsg!: ElementRef<HTMLDialogElement>

  public data = this._dialogMessageService.data

  constructor(
    private _dialogMessageService: DialogMessageService,
    @Optional() private _uiDialogRef: UIDialogRef<DialogMessageComponent>,
  ) {}

  ngAfterViewInit(): void {
    if (this.data()?.title || this.data()?.body || this.data()?.data) {
      this.dialogMsg?.nativeElement.showModal()
    }
  }

  close(data?: any) {
    this._uiDialogRef.close(data)
    this.dialogMsg?.nativeElement.close()
  }
}
