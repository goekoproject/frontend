import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from '../config/services/session-storage.service';
import { preserveDataSession } from '../utils/preserve-data';

export const SS_EXTERNALID = 'external_Id';
export const SS_USERTYPE = 'user_type';
export const SS_USERNAME = 'user_name';
export const SS_USERROLE = 'user_role';

@Injectable({ providedIn: 'platform' })
export class UserContextService {
  private _userType = new BehaviorSubject<any>('');

  public get userType(): Observable<any> {
    preserveDataSession(this._userType, SS_USERTYPE);
    return this._userType.asObservable();
  }
  public set userType(value: any) {
    this.sessionStorageService.setItem<any>(SS_USERTYPE, value);
    this._userType.next(value);
  }

  private _externalId = new BehaviorSubject<any>('');
  public get externalId(): Observable<any> {
    if (!this._externalId.value) {
      const sessionExternalId = this.sessionStorageService.getItem<string>(
        SS_EXTERNALID
      ) as string;
      this._externalId.next(sessionExternalId);
      return this._externalId.asObservable();
    }
    return this._externalId.asObservable();
  }
  public set externalId(value: any) {
    this.sessionStorageService.setItem<string>(SS_EXTERNALID, value);
    this._externalId.next(value);
  }

  private _username = new BehaviorSubject<any>('');
  public get username(): Observable<any> {
    if (!this._username.value) {
      const _username = this.sessionStorageService.getItem<string>(
        SS_USERNAME
      ) as string;
      this._username.next(_username);
      return this._username.asObservable();
    }
    return this._username.asObservable();
  }
  public set username(value: any) {
    this.sessionStorageService.setItem<string>(SS_USERNAME, value);
    this._username.next(value);
  }

  constructor(private readonly sessionStorageService: SessionStorageService) {}

  setUserContext({
    userType = '',
    externalId = '',
    username = '',
    roles = [''],
  }) {
    this.userType = userType;
    this.externalId = externalId;
    this.username = username;
  }
}
