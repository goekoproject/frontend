import { Injectable } from '@angular/core';
import { ACTORS_TYPE, USER_TYPE } from './user-type.constants';
import { SmeService } from '../sme/sme.services';
import { BehaviorSubject, catchError, of, switchMap, throwError } from 'rxjs';
import { SessionStorageService } from '../session-storage.service';
export const SS_COMPANY_DETAIL = 'SS_COMPANY';

@Injectable()
export class UserService {
	private _companyDetail = new BehaviorSubject<unknown | null>(null);

	get companyDetail() {
		if (!this._companyDetail.value) {
			const sessionCompanyDetail = this.sessionStorageService.getItem<any>(SS_COMPANY_DETAIL);
			this._companyDetail.next(sessionCompanyDetail);
			return this._companyDetail.asObservable();
		}
		return this._companyDetail.asObservable();
	}
	public set companyDetail(value) {
		this.sessionStorageService.setItem<any>(SS_COMPANY_DETAIL, value);
		this._companyDetail.next(value);
	}

	constructor(private _smeService: SmeService, private readonly sessionStorageService: SessionStorageService) {}

	getUserProfile(userType: string, externalId: string) {
		if (userType === ACTORS_TYPE.SME) {
			this._getSmeDataProfile(externalId);
		}
	}

	private _getSmeDataProfile(externalId: string) {
		this._smeService
			.getByIdExternal(externalId)
			.pipe(
				switchMap((dataAuth0) =>
					dataAuth0 ? this._smeService.getById(dataAuth0?.id) : throwError(() => 'User not data profile')
				),
				catchError(() => of(null))
			)
			.subscribe((data) => (this.companyDetail = data));
	}

	createDataProfile(userType: string, body: string) {
		if (userType === ACTORS_TYPE.SME) {
			return this._smeService.createDataProfile(body);
		}
		return of(null);
	}

	udpateDataProfile(userType: string, userId: string, body: any) {
		if (userType === ACTORS_TYPE.SME) {
			return this._smeService.updateDataProfile(userId, body);
		}
		return of(null);
	}
}
