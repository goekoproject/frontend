import { ComponentType } from '@angular/cdk/portal'
import { Injectable, Injector, StaticProvider, inject, signal } from '@angular/core'
import { Observable, Subject, filter } from 'rxjs'
import { DIALOG_DATA } from './dialog-data.token'
@Injectable({ providedIn: 'root' })
export class SideDialogService {
  private injector = inject(Injector)

  /*  dialogData = signal<any>(undefined); */

  public get dialogData$() {
    return this._dialogData$
  }
  public set dialogData$(value) {
    this._dialogData$ = value
  }
  private _dialogData$!: Subject<any>

  dialog = signal({
    open: false,
    component: {} as ComponentType<any>,
    data: {} as unknown,
  })
  config = signal({
    injector: Injector.create({ providers: new Array<StaticProvider>() }),
  })
  constructor() {}

  openDialog<T>(component: ComponentType<T>, data?: any): Observable<any> {
    this.dialogData$ = new Subject<any>()
    this.dialog.update((dialog) => ({
      ...dialog,
      open: true,
      component,
      data,
    }))
    this.config.update((config) => ({
      ...config,
      injector: this._createInjector(data),
    }))

    return this.dialogData$.asObservable().pipe(filter((result) => !!result))
  }

  closeDialog<T>(data?: T) {
    this.dialogData$?.next(data)
    this.dialog.update((dialog) => ({ ...dialog, open: false }))
    this.dialog().component = {} as ComponentType<any>
    this.dialogData$?.complete()
  }

  private _createInjector(data: any): Injector {
    const providers: StaticProvider[] = [{ provide: DIALOG_DATA, useValue: data }]

    return Injector.create({ providers })
  }
}
