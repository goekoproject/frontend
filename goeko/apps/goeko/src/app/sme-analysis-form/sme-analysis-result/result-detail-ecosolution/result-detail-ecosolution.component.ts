import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSelect, SmeAnalysisService } from '@goeko/store';
import { SECTION_FEATURE_DETAIL_ECOSOLUTION } from './detail-feature.constants';

@Component({
	selector: 'goeko-result-detail-ecosolution',
	templateUrl: './result-detail-ecosolution.component.html',
	styleUrls: ['./result-detail-ecosolution.component.scss'],
})
export class ResultDetailEcosolutionComponent implements OnInit {
	public detailsEcosolution: any;
	public sectionFeatureDetail = SECTION_FEATURE_DETAIL_ECOSOLUTION;
	public dataSelect = DataSelect;
	constructor(private _router: Router, private _smeAnalysisService: SmeAnalysisService) {}

	ngOnInit(): void {
		this._smeAnalysisService
			.getDetailEcosolutions()
			.subscribe(
				(detailsEcosolution) => (
					(this.detailsEcosolution = detailsEcosolution), console.log(this.detailsEcosolution)
				)
			);
	}
}
