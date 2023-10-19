import { Component, OnInit } from '@angular/core';
import { FORM_FIELD_DEMO } from '../form-field-demo.constants';
import { DataSelect } from '../select-data.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from '../form-field.model';
import { SmeService } from '@goeko/store';
import { FormValueToSmeAnalysisRequest, transformArrayToObj } from './sme-analysis.request';
const defaultSetSuperSelect = (o1: any, o2: any) => {
	if (o1 && o2 && typeof o2 !== 'object') {
		return o1.id.toString() === o2;
	}

	if (o1 && o2 && typeof o2 === 'object') {
		return o1.id.toString() === o2.id.toString();
	}

	return null;
};
@Component({
	selector: 'goeko-sme-form-analysis',
	templateUrl: './sme-form-analysis.component.html',
	styleUrls: ['./sme-form-analysis.component.scss'],
})
export class SmeFormAnalysisComponent implements OnInit {
	public defaultSetSuperSelect = defaultSetSuperSelect as (o1: any, o2: any) => boolean;
	formField = FORM_FIELD_DEMO;
	form!: FormGroup;
	slideSelected = 0;
	public dataSelect = DataSelect as any;
	private _smeDataProfile!: any;
	private _smeId!: string;
	isSummarySlide() {
		return this.slideSelected === this.formField.length - 1;
	}

	constructor(
		private _fb: FormBuilder,
		private _router: Router,
		private _smeServices: SmeService,
		private _route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this._smeId = this._route.snapshot.paramMap.get('id') as string;
		console.log(this._smeId);
		this.form = this._fb.group({});
		this._createFormGroup();
		this._smeServices.smeCompanyDetail.subscribe((company) => {
			if (company) {
				this._smeDataProfile = company;
			}
		});
		if (this._smeId) {
			this._getLastAnalysis();
		}
	}

	private _getLastAnalysis() {
		this._smeServices.getLastRecommendationById(this._smeId).subscribe((requestClassifications) => {
			if (requestClassifications) {
				const classifications = transformArrayToObj(requestClassifications.classifications);
				this.form.patchValue(classifications);
				this.form.markAllAsTouched();
			}
		});
	}

	private _createFormGroup() {
		this.formField.forEach((group) => {
			if (group.controlName) {
				const formGroup = this._fb.group({});
				group?.fields?.forEach((control: Field) => {
					formGroup.addControl(control.controlName, this._fb.control(''));
				});
				this.form.addControl(group.controlName, formGroup);
			}
		});
	}
	addFormGroup(index: any) {
		this.slideSelected = index;
	}

	gotToSummary() {
		this.slideSelected = this.formField.length - 1;
	}
	getResults() {
		this._router.navigate(['demo/sme/result']);
	}
	saveAnalysis() {
		console.log(this.form.value);
		const smeAnalysisRequest = new FormValueToSmeAnalysisRequest(this._smeDataProfile.id, this.form.value);
		this._smeServices.createRecommendations(smeAnalysisRequest).subscribe((res) => console.log(res));
	}
}
