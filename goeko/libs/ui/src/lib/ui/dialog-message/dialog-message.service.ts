import { Injectable, signal } from '@angular/core';
import { DialogMessageComponent } from './dialog-message.component';
import { OverlayRefService } from './overlay-ref.service';
import { UIDialogRef } from './ui-dialog-ref';
export type MessageType  = 'info' | 'warning' | 'error';
export enum MESSAGE_TYPE {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',

}
export interface DialogConfig {
    title?: string;
    body?: string;
    buttonPrimary?: string ;
    buttonSecondary?: string;
    type?:MessageType;

}
const DEFAULT_DATA: DialogConfig = {
    title : '',
    body: '',
    buttonPrimary : '',
    buttonSecondary: '',
    type : MESSAGE_TYPE.INFO
}
@Injectable()
export class DialogMessageService {

    public get data() {
        return this._data;
    }
    public set data(value) {
        this._data = value;
    }
    private _data = signal<DialogConfig | null>(DEFAULT_DATA);
	private _uiDialogRef!: UIDialogRef<DialogMessageComponent>;

    constructor(private _dialogRef: OverlayRefService) { }


    open(config: DialogConfig):UIDialogRef<any> {
        this.data.set(config);
        this._uiDialogRef = this._dialogRef.attach<DialogMessageComponent>(DialogMessageComponent, config);
        return this._uiDialogRef;
    }



  
}