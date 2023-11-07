import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, SmeService, SmeRequestResponse, Classifications } from '@goeko/store';
import { FORM_FIELD } from '../form-field-demo.constants';
import { DataSelect } from '../select-data.constants';
import { CategoryModel, transformArrayToObj } from '../sme-form-analysis/sme-analysis.request';
import { SmeAnalysisService } from '../sme-form-analysis/sme-analysis.service';
import { Field } from '../form-field.model';
import { Observable } from 'rxjs';
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
	selector: 'goeko-sme-form-base',
	template: `<div>goeko-sme-form-base</div>`,
})
export class SmeFormBaseComponent implements OnInit {
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onChangeLastRecomendation: EventEmitter<boolean> = new EventEmitter<any>();
	public defaultSetSuperSelect = defaultSetSuperSelect as (o1: any, o2: any) => boolean;
	formField = FORM_FIELD;
	form!: FormGroup;
	slideSelected = 0;
	dateLastRecomendation!: string;
	public dataSelect = DataSelect as any;
	private _smeDataProfile!: any;
	public smeId!: string;
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
		this.smeId = this._route.snapshot.paramMap.get('id') as string;
		this._route.queryParams.subscribe((queryParams: any) => (this._selectedCategory = queryParams.categoryId));
		this.form = this._fb.group({});
		this._createFormGroup();
		this._getSmeCompanyDetail();
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

	public _setLastAnalysis(callback: any) {
		if (this.smeId) {
			this._getLastAnalysis(callback);
		}
	}

	private _getLastAnalysis(callbackLastAnalysis: any) {
		callbackLastAnalysis().subscribe((requestClassifications: SmeRequestResponse) => {
			if (requestClassifications) {
				this.dateLastRecomendation = requestClassifications.date;
				const classifications = transformArrayToObj(requestClassifications.classifications);
				const _searchName = requestClassifications?.searchName as string;
				this._updateForm(classifications, _searchName);
			}
		});
	}

	private _updateForm(classifications: CategoryModel, searchName: string) {
		this.form.patchValue(classifications);
		this.form.controls['searchName']?.patchValue(searchName);
		this.form.markAllAsTouched();
		this.onChangeLastRecomendation.emit(true);
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
		setTimeout(() => {
			if (this.smeId) {
				this._router.navigate([`../${this.smeId}/summary`], {
					relativeTo: this._route,
					queryParamsHandling: 'preserve',
				});
			} else {
				this._router.navigate([`summary`], {
					relativeTo: this._route,
					queryParamsHandling: 'preserve',
				});
			}
		});
	}
	getResults() {
		this._router.navigate(['results', this.smeId], { relativeTo: this._route });
	}
}
