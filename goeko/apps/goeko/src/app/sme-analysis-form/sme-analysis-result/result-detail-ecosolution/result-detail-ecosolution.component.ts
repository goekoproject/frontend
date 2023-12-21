import { Component, OnInit } from '@angular/core';
import { DataSelect, Recommendation, SmeAnalysisService } from '@goeko/store';
import { AutoUnsubscribe } from '@goeko/ui';
import { Subject, takeUntil } from 'rxjs';
import { SECTION_FEATURE_DETAIL_ECOSOLUTION } from './detail-feature.constants';

@AutoUnsubscribe()
@Component({
	selector: 'goeko-result-detail-ecosolution',
	templateUrl: './result-detail-ecosolution.component.html',
	styleUrls: ['./result-detail-ecosolution.component.scss'],
})
export class ResultDetailEcosolutionComponent implements OnInit {
	private destroy$ = new Subject<void>();

	public detailsEcosolution!: Recommendation;
	public sectionFeatureDetail = SECTION_FEATURE_DETAIL_ECOSOLUTION;
	public dataSelect = DataSelect;
	constructor(private _smeAnalysisService: SmeAnalysisService) {}

	ngOnInit(): void {
		this._smeAnalysisService
			.getDetailEcosolutions()
			.pipe(takeUntil(this.destroy$))
			.subscribe((detailsEcosolution: Recommendation) => (this.detailsEcosolution = detailsEcosolution));
	}
}
