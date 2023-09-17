import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FORM_FIELD_DEMO } from '../demo-container/form-field-demo.constants';
import { SmeRecomendation, SmeService } from '@goeko/store';
import { DemoService } from '../demo.services';
import { SmeRecomendationParams } from '../demo-result.request';
import { TranslateService } from '@ngx-translate/core';

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
	zoomOutIn = false;
	@ViewChild('all') checkedAll!: ElementRef<HTMLInputElement>;
	get allChecked() {
		const allChecked = !this.formField.some((field) => field.checked);
		return allChecked;
	}

	get currentLangCode(): string {
		return this._currentLangCode;
	}

	set currentLangCode(currentLang: string) {
		this._currentLangCode = currentLang;
		this._getSmeRecomendations();
		this.closeDetails();
	}

	private _currentLangCode!: string;

	smeRecomendationBody!: any;
	constructor(
		private _smeService: SmeService,
		private _demoService: DemoService,
		private _translateServices: TranslateService
	) {}

	ngOnInit(): void {
		this.smeRecomendationBody = new SmeRecomendationParams(this._demoService.getDataForm());
		this.currentLangCode = this._translateServices.defaultLang;
		this._changeLangCode();
		this._getSmeRecomendations();
	}

	private _changeLangCode() {
		this._translateServices.onLangChange.subscribe((res) => (this.currentLangCode = res.lang));
	}
	private _getSmeRecomendations() {
		this._smeService.getRecommendations(this.smeRecomendationBody).subscribe((sme) => {
			if (sme && Array.isArray(sme.recommendations)) {
				const smeRecomendation = this._filterSmeRecomendations(sme.recommendations);
				this.smeRecomendation = this._buildCountriesAvailability(smeRecomendation);
			}
		});
	}

	private _buildCountriesAvailability(solutions: any) {
		return solutions.map((res: any) => ({
			...res,
			companyDetail: {
				...res?.companyDetail,
				countriesAvailability: res?.companyDetail.countries
					.map((countries: string) => this.getCountriesAvailability(countries))
					.toString(),
			},
		}));
	}

	getCountriesAvailability(countries: any) {
		const lang = this.currentLangCode === 'gb' ? 'en' : this.currentLangCode;
		const regionNames = new Intl.DisplayNames([lang], { type: 'region' });
		return ` ${regionNames.of(countries)}`;
	}

	handlerOpenDetail(selectedRecomendation: any, selectedRecomendationIndex: number) {
		this.selectedRecomendation = selectedRecomendation;
		if (!this.toogleOpenDetails) {
			this.toogleOpenDetails = true;
		}

		this.selectedRecomendationIndex = selectedRecomendationIndex;
	}

	onCheckboxStateChange(checked: any, index: number) {
		const selectedSection = this.formField.at(index);
		if (selectedSection) {
			selectedSection.checked = !selectedSection.checked;
			this._getSmeRecomendations();
		}
	}

	private _filterSmeRecomendations(smeRecomendation: any) {
		if (this.checkedAll?.nativeElement?.checked) {
			return smeRecomendation;
		}
		let newSmeRecomendation = new Array<any>();

		const fieldChecked = this.formField.filter((field) => field.checked);
		fieldChecked.forEach((el: any) => {
			const newArray = smeRecomendation.filter(
				(recomendation: any) =>
					recomendation.classification.mainCategory.name.toUpperCase() === el.controlName.toUpperCase()
			);
			newSmeRecomendation = [...newSmeRecomendation, ...newArray];
		});
		return newSmeRecomendation;
	}
	closeDetails() {
		this.toogleOpenDetails = false;
		this.zoomOutIn = false;
	}

	getAll(checked: boolean) {
		this.formField = this.formField.map((field) => ({ ...field, checked: checked }));
		this._getSmeRecomendations();
	}
}
