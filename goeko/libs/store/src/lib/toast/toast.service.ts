import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'


export type ToastNotification = 'SUCCESS' | 'UPDATE' | 'ERROR' | 'DELETE' | 'WARNING'; 
export enum TOAST_NOTIFICATION_TYPE {
  SUCCESS = 'SUCCESS',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}

export interface Notification  {
  message: string
  type: ToastNotification
  subtype?: string

}


@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _messageSource = new BehaviorSubject<Notification | null >(null);
  public get messageSource() {
    return this._messageSource
  }
  public set messageSource(value) {
    this._messageSource = value
  }

  constructor() {
  }

  notify(message: string, type: ToastNotification, subtype?: string) {
    this.messageSource.next({ message, type, subtype })
  }
}
