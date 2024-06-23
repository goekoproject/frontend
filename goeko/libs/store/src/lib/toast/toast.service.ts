import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export type ToastNotification = 'SUCCESS' | 'ERROR' | 'WARNING'
export type ToastNotificationSubType = 'POST' | 'PUT' | 'DELETE'

export enum TOAST_NOTIFICATION_TYPE {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}
export enum TOAST_NOTIFICATION_SUBTYPE {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Notification {
  message: string
  type: ToastNotification
  subtype?: ToastNotificationSubType
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _messageSource = new BehaviorSubject<Notification | null>(null)
  public get messageSource() {
    return this._messageSource
  }
  public set messageSource(value) {
    this._messageSource = value
  }

  constructor() {}

  notify(message: string, type: ToastNotification, subtype?: ToastNotificationSubType) {
    this.messageSource.next({ message, type, subtype })
  }
}
