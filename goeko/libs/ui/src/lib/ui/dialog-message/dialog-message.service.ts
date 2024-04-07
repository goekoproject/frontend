import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type MessageType  = 'info' | 'warning' | 'error';
export enum MESSAGE_TYPE {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',

}
export interface DialogData {
    title?: string;
    body?: string;
    buttonPrimary?: string ;
    buttonSecondary?: string;
    type?:MessageType;

}
const DEFAULT_DATA: DialogData = {
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
    private _data = signal<DialogData | null>(DEFAULT_DATA);

    private _responseMessage = new BehaviorSubject<boolean>(false);
    constructor() { }


    open(data: DialogData) {
        this.data.set(data);
        return this._responseMessage.asObservable();
    }

    onSubmitAccept(isAccept: boolean) {
        this._responseMessage.next(isAccept);
        this._responseMessage.complete();
    }


  
}