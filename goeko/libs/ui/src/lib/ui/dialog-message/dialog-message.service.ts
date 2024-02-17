import { Injectable, signal } from '@angular/core';

export interface DialogData {
    title: string;
    body?: string;
    buttonPrimary?: string ;
    buttonSecondary?: string;

}
const DEFAULT_DATA: DialogData = {
    title : '',
    body: '',
    buttonPrimary : '',
    buttonSecondary: ''
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

    constructor() { }


    open(data: DialogData) {
        this.data.set(data);
    }


  
}