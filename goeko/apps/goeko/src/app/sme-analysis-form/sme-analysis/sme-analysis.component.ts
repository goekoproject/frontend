import { Component, OnDestroy } from '@angular/core';
import { SmeAnalysisService } from '../sme-analysis.service';

@Component({
	selector: 'goeko-sme-analysis',
	templateUrl: './sme-analysis.component.html',
	styleUrls: ['./sme-analysis.component.scss'],
})
export class SmeAnalysisComponent implements OnDestroy {
	private _currentAnalytics = this._smeAnalysisService.currentAnalytics;

	constructor(private _smeAnalysisService: SmeAnalysisService) {}

	ngOnDestroy(): void {
		this._currentAnalytics.set(null);
	}
}
