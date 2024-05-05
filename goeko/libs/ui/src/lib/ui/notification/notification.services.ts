import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'info' | 'warning' | 'error';
export type NotificationAppearance = 'fill' | 'flat';

export interface NotificationConfig {
  type: NotificationType;
  appearance: NotificationAppearance;
}
export interface NotificationMessageShell {
  title?: string;
  texts?: string[];
}
const DEFUALT_CONFIG: NotificationConfig = {
  type: 'info',
  appearance: 'fill',
};
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _data = new BehaviorSubject<null | NotificationMessageShell>(null);

  public get data() {
    return this._data;
  }
  public set data(value) {
    this._data = value;
  }
  private _config = new BehaviorSubject<NotificationConfig>(DEFUALT_CONFIG);
  public get config() {
    return this._config;
  }
  public set config(value) {
    this._config = value;
  }

  constructor() {}

  notify({
    data = null,
    config = DEFUALT_CONFIG,
  }: {
    data: NotificationMessageShell | null;
    config?: NotificationConfig;
  }) {
    this._config.next({ ...config });
    this._data.next(data);
  }
}
