import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from '../config/services/session-storage.service';

export const SS_EXTERNALID = 'external_Id';
export const SS_USERTYPE = 'user_type';

@Injectable({ providedIn: 'platform' })
export class UserContextService {
	private _userType = new BehaviorSubject<any>('');
	public get userType(): Observable<any> {
		if (!this._externalId.value) {
			const sessionuserType = this.sessionStorageService.getItem<string>(SS_USERTYPE) as string;
			this._userType.next(sessionuserType);
			return this._userType.asObservable();
		}
		return this._userType.asObservable();
	}
	public set userType(value: any) {
		this.sessionStorageService.setItem<any>(SS_USERTYPE, value);
		this._userType.next(value);
	}

	private _externalId = new BehaviorSubject<any>('');
	public get externalId(): Observable<any> {
		if (!this._externalId.value) {
			const sessionExternalId = this.sessionStorageService.getItem<string>(SS_EXTERNALID) as string;
			this._externalId.next(sessionExternalId);
			return this._externalId.asObservable();
		}
		return this._externalId.asObservable();
	}
	public set externalId(value: any) {
		this.sessionStorageService.setItem<string>(SS_EXTERNALID, value);
		this._externalId.next(value);
	}

	constructor(private readonly sessionStorageService: SessionStorageService) {}

	setUserContext({ userType = '', externalId = '' }) {
		this.userType = userType;
		this.externalId = externalId;
	}
}
