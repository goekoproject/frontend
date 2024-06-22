import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface Notification  {
  message: string
  type: string
  subtype?: string

}


@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _messageSource = new BehaviorSubject<Notification>({
    message: 'Probando probando ..',
    type: 'success',
    subtype: undefined,
  })
  public get messageSource() {
    return this._messageSource
  }
  public set messageSource(value) {
    this._messageSource = value
  }

  constructor() {
  }

  notify(message: string, type: string, subtype?: string) {
    this.messageSource.next({ message, type, subtype })
  }
}
