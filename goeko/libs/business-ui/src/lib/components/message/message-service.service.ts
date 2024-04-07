import { Injectable } from '@angular/core';
import { DialogData, DialogMessageService, MESSAGE_TYPE, MessageType } from '@goeko/ui';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {

  private _item?:string;
  private _type!: MessageType;
  get title(): string | undefined {
    return this._title;
  }

  set title(title: string | undefined) {
    this._title = title;
  }
  private _title?: string;
  constructor(private _dialogMessage: DialogMessageService, private _translate : TranslateService
    ) { }

  infoMessage(type: MessageType,data: {item?: string,title: string}): Observable<any> {
   this._type = type;
   this._item = data.item;
   this.title = this._translate.instant(data.title)
   return this.openMessageDialog();
  }

  deleteMessage(type: MessageType,item?: string): Observable<any> {
    this._type = type;
    this._item = item;
    this.title = this._translate.instant('DIALOG.warningDelete', {
      item: this._item,
    });;
    return this.openMessageDialog();
   }

  private openMessageDialog() {
    const dialogRef = this._dialogMessage.open(this._buildDialogData());
    return dialogRef;
  }

  private _buildDialogData() : DialogData {
    return {
      title: this.title,
      buttonPrimary: this._translate.instant('accept'),
      buttonSecondary: this._translate.instant('cancel'),
      type: this._type
    }
  }



}
