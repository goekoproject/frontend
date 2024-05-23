import { Injectable, inject } from '@angular/core';
import {
    RemoteConfig,
    activate,
    fetchAndActivate,
    fetchConfig,
    getValue
} from '@angular/fire/remote-config';

@Injectable()
export class RemoteConfigService {
  private _remoteConfig = inject(RemoteConfig);

  constructor() {
    fetchConfig(this._remoteConfig);
    activate(this._remoteConfig);
    fetchAndActivate(this._remoteConfig);
    this._remoteConfig.settings.minimumFetchIntervalMillis = 100;
  }

  public getValue(key: string) {
    fetchConfig(this._remoteConfig);
    activate(this._remoteConfig);
    return getValue(this._remoteConfig, key);
  }
 }
