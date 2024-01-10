import { ComponentType } from '@angular/cdk/portal';
import {
  Injectable,
  Injector,
  StaticProvider,
  inject,
  signal,
} from '@angular/core';
import { DIALOG_DATA } from './dialog-data.token';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, filter, of } from 'rxjs';
@Injectable()
export class DialogService {
  private injector = inject(Injector);

  dialogData = signal<any>(undefined);
  dialog = signal({
    open: false,
    component: {} as ComponentType<any>,
    data: {} as unknown,
  });
  config = signal({
    injector: Injector.create({ providers: new Array<StaticProvider>() }),
  });
  constructor() {}

  openDialog<T>(component: ComponentType<T>, data: any): Observable<any> {
    this.dialog.update((dialog) => ({
      ...dialog,
      open: true,
      component,
      data,
    }));
    this.config.update((config) => ({
      ...config,
      injector: this._createInjector(data),
    }));

    return toObservable(this.dialogData, {
      injector: this.injector,
    }).pipe(filter((result) => !!result));
  }

  closeDialog<T>(data?: T) {
    this.dialogData.set(data);
    this.dialog.update((dialog) => ({ ...dialog, open: false }));
  }

  private _createInjector(data: any): Injector {
    const providers: StaticProvider[] = [
      { provide: DIALOG_DATA, useValue: data },
    ];

    return Injector.create({ providers });
  }
}
