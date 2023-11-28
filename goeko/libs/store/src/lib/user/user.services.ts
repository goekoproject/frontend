import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap, throwError } from 'rxjs';
import { CleanTechService } from '../cleantech/cleanteach.services';
import { SessionStorageService } from '../session-storage.service';
import { SmeService } from '../sme/sme.services';
import { ACTORS_TYPE } from './user-type.constants';
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

	constructor(
		private _smeService: SmeService,
		private _cleanTechService: CleanTechService,
		private readonly sessionStorageService: SessionStorageService
	) {}

	getUserProfile(userType: string, externalId: string) {
		if (userType === ACTORS_TYPE.SME) {
			this._getSmeDataProfile(externalId);
		}
		if (userType === ACTORS_TYPE.CLEANTECH) {
			this._getCleaTechDataProfile(externalId);
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

	private _getCleaTechDataProfile(externalId: string) {
		this._cleanTechService
			.getByIdExternal(externalId)
			.pipe(
				switchMap((dataAuth0) =>
					dataAuth0
						? this._cleanTechService.getById(dataAuth0?.id)
						: throwError(() => 'User not data profile')
				),
				catchError(() => of(null))
			)
			.subscribe((data) => (this.companyDetail = data));
	}

	createDataProfile(userType: string, body: any) {
		if (userType === ACTORS_TYPE.SME) {
			const _body = this._transformbBody(body);
			return this._smeService.createDataProfile(_body);
		}
		if (userType === ACTORS_TYPE.CLEANTECH) {
			const _body = this._transformbBody(body);
			return this._cleanTechService.createDataProfile(_body);
		}
		return of(null);
	}

	udpateDataProfile(userType: string, userId: string, body: any) {
		if (userType === ACTORS_TYPE.SME) {
			const _body = this._transformbBody(body);
			return this._smeService.updateDataProfile(userId, _body);
		}
		if (userType === ACTORS_TYPE.CLEANTECH) {
			const _body = this._transformbBody(body);
			return this._cleanTechService.updateDataProfile(userId, _body);
		}
		return of(null);
	}

	private _transformbBody(body: any) {
		return {
			...body,
			country: body?.country?.code,
		};
	}
}
