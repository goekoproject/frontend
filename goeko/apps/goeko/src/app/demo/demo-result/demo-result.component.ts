import { Component, OnInit } from '@angular/core';
import { FORM_FIELD_DEMO } from '../demo-container/form-field-demo.constants';
import { SmeRecomendation, SmeService } from '@goeko/store';

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

	bodyMock = {
		companyDetail: {
			name: 'SME A',
			numberEmployees: '4',
			countries: ['SPAIN', 'FRANCE'],
			email: 'sme@gmail.com',
			link: 'www.sme.com/contact',
		},
		co2Emission: {
			mainInternalCombustionEngine: {
				name: 'loader',
				lastYearInvoice: {
					amount: '81273618273',
					currency: 'EUR',
				},
			},
			mainMineralProduct: {
				name: 'concrete',
				lastYearInvoice: {
					amount: '81273618273',
					currency: 'EUR',
				},
			},
			mainRigidMaterial: {
				name: 'insolationPanel',
			},
		},
		waste: {
			mainCategoryNonInert: 'metalsAndAlloys',
		},
		toxicProduct: {
			products: ['aerosol', 'batteries'],
		},
		waterConsumption: {
			mainActivity: ['siteCleaning'],
			amount: '1298379123',
			lastYearInvoice: {
				amount: '81273618273',
				currency: 'EUR',
			},
		},
	};
	constructor(private _smeService: SmeService) {}

	ngOnInit(): void {
		this.smeRecomendation = new Array();
		this._smeService.getRecommendations(this.bodyMock).subscribe((recomendation) => {
			this.transformRecommendations(recomendation);
			console.log(this.smeRecomendation);
		});
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
	}

	private transformRecommendations(recomendation: any): void {
		Object.keys(recomendation).forEach((element: any) => {
			const solutions = recomendation[element];
			solutions.forEach((s: any) => this.smeRecomendation.push(s));
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
