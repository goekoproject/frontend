import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { SessionStorageService } from '../session-storage.service';

const SS_SME_FORM = 'go-sme-form';
@Injectable({
	providedIn: 'platform',
})
export class SmeAnalysisService {
	private _currentAnalysis = new BehaviorSubject<any>(null);
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
}
