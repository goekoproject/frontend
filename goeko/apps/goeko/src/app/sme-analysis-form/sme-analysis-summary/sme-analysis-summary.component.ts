import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmeService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { FORM_FIELD } from '../form-field-demo.constants';
import { Section } from '../form-field.model';
import { DataSelect, DataSelectOption } from '../select-data.constants';
import { FormValueToSmeAnalysisRequest } from '../sme-form-analysis/sme-analysis.request';
import { SmeAnalysisService } from '../sme-form-analysis/sme-analysis.service';

@Component({
	selector: 'goeko-sme-analysis-summary',
	templateUrl: './sme-analysis-summary.component.html',
	styleUrls: ['./sme-analysis-summary.component.scss'],
})
export class SmeAnalysisSummaryComponent implements OnInit {
	@Output() editForm: EventEmitter<number> = new EventEmitter();
	public dataSelect = DataSelect;
	formField = FORM_FIELD;
	formValue!: any;
	public saveOK = false;
	private _smeId!: string;
	public toogleSaveName = false;
	public get isProject() {
		return this._route?.parent?.snapshot.queryParams['isProject'] === 'true';
	}

	isBoolean(value: any) {
		return typeof value === 'boolean';
	}
	isArray(value: any) {
		return Array.isArray(value);
	}

	tranformValueArray(element: Section, value: any) {
		let valueArray;
		const formValue = this.formValue[element.controlName][value.controlName];

		if (this.isArrayOfType(formValue, 'string')) {
			const dataSelect = this.dataSelect[value.controlName as keyof typeof DataSelect];
			valueArray = dataSelect.filter((option: DataSelectOption) => formValue.includes(option.id));
		} else {
			valueArray = formValue;
		}

		return valueArray.map((optionSelect: any) => this._translateService.instant(optionSelect.keyLang)).join(',  ');
	}
	constructor(
		private _translateService: TranslateService,
		private _smeServices: SmeService,
		private _smeAnalysisService: SmeAnalysisService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit(): void {
		this._smeId = this._getSmeId();
		this._smeAnalysisService.getCurrentAnalysis().subscribe((res) => {
			if (res) {
				this.formValue = res;
			}
		});
	}

	private _getSmeId(): string {
		const idByNewAnalysis = this._route?.parent?.snapshot.params['id'] as string;
		const idByLastRecommended = this._route.snapshot.queryParamMap.get('smeId') as string;
		return idByNewAnalysis || idByLastRecommended;
	}
	isArrayOfType(arr: any[], type: 'number' | 'object' | 'string'): boolean {
		if (!Array.isArray(arr)) {
			return false; // No es un array
		}

		if (arr.length === 0) {
			return true; // Un array vacío se considera válido para ambos tipos
		}

		const sample = arr[0];

		switch (type) {
			case 'number':
				return typeof sample === 'number' && arr.every((item) => typeof item === 'number');
			case 'object':
				return (
					typeof sample === 'object' &&
					!Array.isArray(sample) &&
					arr.every((item) => typeof item === 'object' && !Array.isArray(item))
				);
			case 'string':
				return typeof sample === 'string' && arr.every((item) => typeof item === 'string');

			default:
				return false;
		}
	}

	onSearchNameChange(event: CustomEvent) {
		const value = event.detail;
		this.formValue = {
			...this.formValue,
			searchName: value,
		};
	}
	editCategory(categoryId: string) {
		this._router.navigate(['sme-analysis'], {
			queryParams: { categoryId: categoryId },
		});
	}

	getResults() {
		this._router.navigate(['../results', this._smeId], { relativeTo: this._route });
	}
	saveAnalysis() {
		const smeAnalysisRequest = new FormValueToSmeAnalysisRequest(this._smeId, this.formValue);
		this._smeServices.createRecommendations(smeAnalysisRequest).subscribe((res) => {
			this.saveOK = true;
			setTimeout(() => {
				this.saveOK = false;
			}, 5000);
		});
	}

	cancel() {
		this._router.navigate(['dashboard/sme']);
	}
}
