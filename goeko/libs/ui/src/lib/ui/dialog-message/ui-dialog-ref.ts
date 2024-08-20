import { OverlayRef } from '@angular/cdk/overlay'
import { Observable, Subject } from 'rxjs'

export class UIDialogRef<T> {
  /** Instance of the component making up the content of the bottom sheet. */
  instance!: T

  containerInstance!: T

  private _beforeClose = new Subject<any>()
  private _afterClosed = new Subject<any>()

  private _data: any

  constructor(private overlayRef: OverlayRef) {}

  close<T>(data?: any): void {
    this._data = data
    this._afterClosed.next(data as T)
    this.overlayRef.detach()
  }

  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable()
  }

  beforeClose(): Observable<any> {
    return this._beforeClose.asObservable()
  }
}
