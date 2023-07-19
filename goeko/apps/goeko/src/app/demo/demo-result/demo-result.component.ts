import { Component, OnInit } from '@angular/core';
import { FORM_FIELD_DEMO } from '../demo-container/form-field-demo.constants';
import { SmeRecomendation, SmeService } from '@goeko/store';
import { DemoService } from '../demo.services';
import { SmeRecomendationParams } from '../demo-result.request';

@Component({
	selector: 'goeko-demo-result',
	templateUrl: './demo-result.component.html',
	styleUrls: ['./demo-result.component.scss'],
})
export class DemoResultComponent implements OnInit {
	formField = FORM_FIELD_DEMO;
	toogleOpenDetails = false;
	smeRecomendation!: any;
	selectedRecomendation: any;
	selectedRecomendationIndex: any;

	getCountriesAvailability(countries: any) {
		const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

		return regionNames.of(countries);
	}

	smeRecomendationBody!: any;
	constructor(private _smeService: SmeService, private _demoService: DemoService) {}

	ngOnInit(): void {
		this.smeRecomendationBody = new SmeRecomendationParams(this._demoService.getDataForm());
		console.log(this.smeRecomendationBody);

		this._smeService.getRecommendations(this.smeRecomendationBody).subscribe((recomendation) => {
			this.transformRecommendations(recomendation);
			console.log(this.smeRecomendation);
		});
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
	}

	private transformRecommendations(recomendation: any): void {
		this.smeRecomendation = new Array();
		Object.keys(recomendation).forEach((element: any) => {
			const solutions = recomendation[element];
			this._buildCountriesAvailability(solutions);
			solutions.forEach((s: any) => this.smeRecomendation.push(s));
		});
	}
	private _buildCountriesAvailability(solutions: any) {
		if (!solutions) {
			return;
		}
		solutions.map((res: any) => {
			res.companyDetail = {
				...res?.companyDetail,
				countriesAvailability: res?.companyDetail.countries
					.map((countries: string) => this.getCountriesAvailability(countries))
					.toString(),
			};
		});
	}

	handlerOpenDetail(selectedRecomendation: any, selectedRecomendationIndex: number) {
		this.selectedRecomendation = selectedRecomendation;
		if (!this.toogleOpenDetails) {
			this.toogleOpenDetails = true;
		}

		this.selectedRecomendationIndex = selectedRecomendationIndex;
	}
	closeDetails() {
		this.toogleOpenDetails = false;
	}
}
