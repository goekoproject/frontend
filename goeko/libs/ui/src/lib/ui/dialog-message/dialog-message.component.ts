import { Component, ElementRef, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogMessageService } from './dialog-message.service';

@Component({
  selector: 'goeko-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.scss',
})
export class DialogMessageComponent {
  @ViewChild('dialogMsg') dialogMsg!: ElementRef<HTMLDialogElement>;

  public data = this._dialogMessageService.data;

  constructor(private _dialogMessageService: DialogMessageService){
    effect(() => {
      this._toggleDialog();

    })
  }
  private _toggleDialog() {
    if (this.data()?.title) {
      this.dialogMsg?.nativeElement.showModal();
    } else {
      this.dialogMsg?.nativeElement.close();
    }
  }

  closeDialog() {
    this.dialogMsg?.nativeElement.close();

  }
  
}
