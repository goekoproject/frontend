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
	get allChecked() {
		return !this.formField.some((field) => field.checked);
	}
	getCountriesAvailability(countries: any) {
		const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

		return regionNames.of(countries);
	}

	smeRecomendationBody!: any;
	constructor(private _smeService: SmeService, private _demoService: DemoService) {}

	ngOnInit(): void {
		this.smeRecomendationBody = new SmeRecomendationParams(this._demoService.getDataForm());
		this._getSmeRecomendations();
	}

	private _getSmeRecomendations() {
		this._smeService.getRecommendations(this.smeRecomendationBody).subscribe((recomendation) => {
			this.transformRecommendations(recomendation);
		});
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

	onCheckboxStateChange(checked: any, index: number) {
		let newSmeRecomendation = new Array<any>();
		const selectedSection = this.formField.at(index);
		if (selectedSection) {
			selectedSection.checked = !selectedSection.checked;
			const fieldChecked = this.formField.filter((field) => field.checked);
			this._getSmeRecomendations();

			fieldChecked.forEach((el: any) => {
				const newArray = this.smeRecomendation.filter(
					(recomendation: any) =>
						recomendation.classification.mainCategory.name.toUpperCase() === el.controlName.toUpperCase()
				);
				newSmeRecomendation = [...newSmeRecomendation, ...newArray];
			});
			console.log(fieldChecked);

			console.log(newSmeRecomendation);
			this.smeRecomendation = new Array<any>();
			this.smeRecomendation = newSmeRecomendation;
			console.log(this.smeRecomendation);
		}
	}
	closeDetails() {
		this.toogleOpenDetails = false;
	}

	getAll(checked: boolean) {
		if (checked) {
			this._getSmeRecomendations();
		}
	}
}
