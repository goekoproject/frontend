import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { SessionStorageService } from '../session-storage.service';

const SS_SME_FORM = 'go-sme-form';
const SS_ECOSOLUTION_DETAIL = 'go-ecosolution-details';

@Injectable({
	providedIn: 'platform',
})
export class SmeAnalysisService {
	private _currentAnalysis = new BehaviorSubject<any>(null);

	private _detailEcosolutions = new BehaviorSubject<any>(null);

	constructor(private _sessionStoregeService: SessionStorageService) {}

	setCurrentAnalysis(currentAnalysis: any) {
		this._sessionStoregeService.setItem<any>(SS_SME_FORM, currentAnalysis);
		this._currentAnalysis.next(currentAnalysis);
	}

	getCurrentAnalysis() {
		if (!this._currentAnalysis.value) {
			const currentAnalysis = this._sessionStoregeService.getItem<any>(SS_SME_FORM);
			this._currentAnalysis.next(currentAnalysis);

			return this._currentAnalysis.asObservable();
		}
		return this._currentAnalysis.asObservable();
	}

	setDetailEcosolutions(detailEcosolutions: any) {
		this._sessionStoregeService.setItem<any>(SS_ECOSOLUTION_DETAIL, detailEcosolutions);
		this._detailEcosolutions.next(detailEcosolutions);
	}

	getDetailEcosolutions() {
		if (!this._detailEcosolutions.value) {
			const detailEcosolutions = this._sessionStoregeService.getItem<any>(SS_ECOSOLUTION_DETAIL);
			this._detailEcosolutions.next(detailEcosolutions);

			return this._detailEcosolutions.asObservable();
		}
		return this._detailEcosolutions.asObservable();
	}
}
