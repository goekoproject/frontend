import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmeService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { FORM_FIELD } from '../form-field-demo.constants';
import { FormValueToSmeAnalysisRequest } from '../sme-form-analysis/sme-analysis.request';
import { SmeAnalysisService } from '../sme-form-analysis/sme-analysis.service';

@Component({
	selector: 'goeko-sme-analysis-result',
	templateUrl: './sme-analysis-result.component.html',
	styleUrls: ['./sme-analysis-result.component.scss'],
})
export class SmeAnalysisResultComponent implements OnInit {
	odsIcons!: Array<{ code: number; active: boolean }>;

	formField = FORM_FIELD;
	toogleOpenDetails = false;
	smeRecomendation!: any;
	selectedRecomendation: any;
	selectedRecomendationIndex: any;
	zoomOutIn = false;
	private _smeId!: string;
	formValue!: any;
	smeDataProfile: any;
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
		private _smeAnalysisService: SmeAnalysisService,
		private _translateServices: TranslateService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit(): void {
		this._smeId = this._route.snapshot.paramMap.get('id') as string;

		this._smeAnalysisService.getCurrentAnalysis().subscribe((analysis) => {
			if (analysis) {
				this.formValue = analysis;
			}
		});
		this.currentLangCode = this._translateServices.defaultLang;
		this._changeLangCode();
		this._getSmeRecomendations();
		this._getOdsIcons();
		this._getSmeCompanyDetail();
	}

	private _getSmeCompanyDetail() {
		this._smeService.smeCompanyDetail.subscribe((company) => {
			if (company) {
				this.smeDataProfile = company;
			}
		});
	}
	private saveAnalysis() {
		const smeAnalysisRequest = new FormValueToSmeAnalysisRequest(this._smeId, this.formValue);
		this._smeService.createRecommendations(smeAnalysisRequest).subscribe((sme) => {
			this._handleRecommendations(sme);
		});
	}
	private _getOdsIcons() {
		const odsIconsCode = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

		this.odsIcons = odsIconsCode.map((code: number) => ({
			code: code,
			active: false,
		}));
	}
	private _changeLangCode() {
		this._translateServices.onLangChange.subscribe((res) => (this.currentLangCode = res.lang));
	}
	private _getSmeRecomendations() {
		this.saveAnalysis();
		/* 		this._smeService.getRecommendations(this.smeRecomendationBody).subscribe((sme) => {
			this._handleRecommendations(sme);
		}); */
	}

	private _handleRecommendations(sme: any) {
		if (sme && Array.isArray(sme.recommendations)) {
			const smeRecomendation = this._filterSmeRecomendations(sme.recommendations);
			this.smeRecomendation = this._buildCountriesAvailability(smeRecomendation);
			this._makeFilterBySDG();
		}
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
					recomendation.classification.mainCategory.toUpperCase() === el.controlName.toUpperCase()
			);
			newSmeRecomendation = [...newSmeRecomendation, ...newArray];
		});
		return newSmeRecomendation;
	}

	filterBySDG(index: number, checked: boolean) {
		this.odsIcons[index].active = !checked;
		this._getSmeRecomendations();
		this._makeFilterBySDG();
	}

	private _makeFilterBySDG() {
		const codeActive = this.odsIcons.filter((sdg) => sdg.active).map((sdgActive) => sdgActive.code);
		if (!this.odsIcons.every((codeActive) => !codeActive.active)) {
			this.smeRecomendation = this.smeRecomendation.filter((recomendation: any) =>
				codeActive.some((elemento) => recomendation.sustainableDevelopmentGoals.includes(elemento))
			);
		}
	}

	contieneArray(arrPrincipal: any, arrBuscado: any) {
		// Iterar a través de los elementos del array principal
		for (let i = 0; i <= arrPrincipal.length - arrBuscado.length; i++) {
			let coincide = true;

			// Comprobar si el subarray coincide en esta posición
			for (let j = 0; j < arrBuscado.length; j++) {
				if (arrPrincipal[i + j] !== arrBuscado[j]) {
					coincide = false;
					return;
				}
			}

			// Si el subarray coincide, retornar true
			if (coincide) {
				return true;
			}
		}

		// Si no se encuentra el subarray, retornar false
		return false;
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
