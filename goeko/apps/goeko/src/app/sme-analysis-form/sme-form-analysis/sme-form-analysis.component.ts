import { Component, OnInit } from '@angular/core';
import { FORM_FIELD } from '../form-field-demo.constants';
import { DataSelect } from '../select-data.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Field } from '../form-field.model';
import { SmeService, UserService } from '@goeko/store';
import { FormValueToSmeAnalysisRequest, transformArrayToObj } from './sme-analysis.request';
import { SmeAnalysisService } from './sme-analysis.service';
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
	formField = FORM_FIELD;
	form!: FormGroup;
	slideSelected = 0;
	dateLastRecomendation!: string;
	public dataSelect = DataSelect as any;
	private _smeDataProfile!: any;
	private _smeId!: string;
	private _selectedCategory!: string;

	isSummarySlide() {
		return this.slideSelected === this.formField.length - 1;
	}

	constructor(
		private _fb: FormBuilder,
		private _router: Router,
		private _userService: UserService,
		private _smeService: SmeService,
		private _route: ActivatedRoute,
		private _smeAnalysisService: SmeAnalysisService
	) {}

	ngOnInit(): void {
		this._smeId = this._route.snapshot.paramMap.get('id') as string;
		this._route.queryParams.subscribe((queryParams: any) => (this._selectedCategory = queryParams.categoryId));
		this.form = this._fb.group({});
		this._createFormGroup();
		this._getSmeCompanyDetail();
		this._setLastAnalysis();
		this._selectCatagory();
	}

	private _getSmeCompanyDetail() {
		this._userService.companyDetail.subscribe((company) => {
			if (company) {
				this._smeDataProfile = company;
			}
		});
	}

	private _selectCatagory() {
		if (!this._selectedCategory) {
			return;
		}
		this._smeAnalysisService.getCurrentAnalysis().subscribe((analysis) => this.form.patchValue(analysis));
		const indexCarousel = this.formField.findIndex((formField) => formField.id === this._selectedCategory);
		this.slideSelected = indexCarousel;
	}

	private _setLastAnalysis() {
		if (this._smeId) {
			this._getLastAnalysis();
		}
	}

	private _getLastAnalysis() {
		this._smeService.getLastRecommendationById(this._smeId).subscribe((requestClassifications) => {
			if (requestClassifications) {
				this.dateLastRecomendation = requestClassifications.date;
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
		this._smeAnalysisService.setCurrentAnalysis(this.form.value);
		setTimeout(() => this._router.navigate(['sme-analysis/summary', this._smeDataProfile.id]));
	}
	getResults() {
		this._router.navigate(['results', this._smeId], { relativeTo: this._route });
	}
}
