import { Injectable } from '@angular/core'
import { DialogConfig, DialogMessageService, MESSAGE_TYPE, MessageType } from '@goeko/ui'
import { TranslateService } from '@ngx-translate/core'

@Injectable()
export class MessageService {
  private _item?: string
  private _type!: MessageType
  get title(): string | undefined {
    return this._title
  }

  set title(title: string | undefined) {
    this._title = title
  }

  get dialogRef() {
    return this._dialogMessage.open(this._buildDialogData())
  }

  private get buttonPrimary(): string {
    return this._buttonPrimary
  }
  private set buttonPrimary(value) {
    this._buttonPrimary = value
  }
  private get buttonSecondary(): string {
    return this._buttonSecondary
  }

  private set buttonSecondary(value) {
    this._buttonSecondary = value
  }

  private _buttonPrimary = this._translate.instant('accept')
  private _buttonSecondary = this._translate.instant('cancel')
  private _title?: string
  constructor(
    private _dialogMessage: DialogMessageService,
    private _translate: TranslateService,
  ) {}

  infoMessage(type: MessageType, data: { item?: string; title: string; buttonPrimary?: string; buttonSecondary: string }) {
    this._type = type
    this._item = data.item
    this.title = this._translate.instant(data.title)
    this.buttonPrimary = this._translate.instant(data.buttonPrimary || 'accept')
    this.buttonSecondary = this._translate.instant(data.buttonSecondary || 'cancel')
    return this.dialogRef
  }

  deleteMessage(item?: string) {
    this._type = MESSAGE_TYPE.WARNING
    this._item = item
    this.title = this._translate.instant('DIALOG.warningDelete', {
      item: this._item,
    })
    return this.dialogRef
  }

  private _buildDialogData(): DialogConfig {
    return {
      title: this.title,
      buttonPrimary: this._buttonPrimary,
      buttonSecondary: this._buttonSecondary,
      type: this._type,
    }
  }
}
