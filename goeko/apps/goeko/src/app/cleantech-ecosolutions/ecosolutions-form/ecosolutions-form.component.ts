import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui';
import {
	CountrySelectOption,
	DataSelect,
	DataSelectOption,
	EcosolutionsService,
	NewEcosolutionsBody,
	ODS_CODE,
} from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { Field } from 'contentful';
import { EcosolutionForm } from './ecosolution-form.model';

const defaultSetProductsCategories = (o1: any, o2: any) => {
	if (o1 && o2 && typeof o2 !== 'object') {
		return o1.toString() === o2;
	}

	if (o1 && o2 && typeof o2 === 'object') {
		return o1.id.toString() === o2.id.toString();
	}

	return null;
};

const defaultSetDeliverCountries = (option: CountrySelectOption, optionSelected: string) => {
	if (option && optionSelected) {
		return option.code.toString() === optionSelected;
	}

	return null;
};

const defaultSetPaybackPeriodYears = (option: DataSelectOption, optionSelected: number) => {
	if (option && optionSelected) {
		return option.id === optionSelected;
	}

	return null;
};
@Component({
	selector: 'goeko-ecosolutions-form',
	templateUrl: './ecosolutions-form.component.html',
	styleUrls: ['./ecosolutions-form.component.scss'],
})
export class EcosolutionsFormComponent implements OnInit {
	public form!: FormGroup;
	public ods = ODS_CODE;
	public idEcosolution!: string;
	public questionsCategories!: Array<Field | any>;
	public productsCategories!: any[];
	public defaultSetProductsCategories = defaultSetProductsCategories as (o1: any, o2: any) => boolean;
	public defaultSetDeliverCountries = defaultSetDeliverCountries as (
		option: CountrySelectOption,
		optionSelected: string
	) => boolean;
	public defaultSetPaybackPeriodYears = defaultSetPaybackPeriodYears as (
		option: DataSelectOption,
		optionSelected: number
	) => boolean;
	public currentLangCode!: string;
	public dataSelect = DataSelect;

	private _cleantechId!: string;
	private _mainCategory!: string;
	private _fieldsCatagory = FORM_CATEGORIES_QUESTION;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _ecosolutionsService: EcosolutionsService,
		private _fb: FormBuilder,
		private _translateServices: TranslateService
	) {}

	ngOnInit(): void {
		this.currentLangCode = this._translateServices.defaultLang;
		this._getParamsUrl();
		this.questionsCategories = this._fieldsCatagory
			.filter((field) => field.controlName.toUpperCase() === this._mainCategory.toUpperCase())
			.map((co2EmissionFields) => co2EmissionFields.fields)
			.flat();
		this._initForm();
		this._changeLangCode();
		this._changeValueSubCategory();
		if (this.idEcosolution) {
			this.getEcosolution();
		}
	}
	private _getParamsUrl() {
		this._cleantechId = this._route.snapshot.parent?.paramMap.get('id') as string;
		this._mainCategory = this._route.snapshot.queryParamMap.get('mainCategory') as string;
		this.idEcosolution = this._route.snapshot.paramMap.get('id') as string;
	}
	private _changeLangCode() {
		this._translateServices.onLangChange.subscribe((res) => (this.currentLangCode = res.lang));
	}

	private _initForm() {
		this.form = this._fb.group({
			solutionName: ['', Validators.required],
			subCategory: ['', Validators.required],
			products: ['', Validators.required],
			reductionPercentage: [],
			operationalCostReductionPercentage: [],
			sustainableDevelopmentGoals: new FormArray([]),
			price: [0],
			deliverCountries: [],
			paybackPeriodYears: [''],
			marketReady: [false],
			guarantee: [false],
			certified: [false],
			approved: [false],
		});
		this.initCheckboxControlSustainableDevelopmentGoals();
	}

	initCheckboxControlSustainableDevelopmentGoals(): void {
		const odsControls = this.ods.map((ods) => this._fb.group({ checked: false, value: ods }));
		this.form.setControl('sustainableDevelopmentGoals', this._fb.array(odsControls));
	}
	get sustainableDevelopmentGoals(): FormArray {
		return this.form.get('sustainableDevelopmentGoals') as FormArray;
	}

	private _changeValueSubCategory() {
		this.form.get('subCategory')?.valueChanges.subscribe((subCategory) => {
			if (subCategory) {
				this.productsCategories = DataSelect[subCategory as keyof typeof DataSelect];
			}
		});
	}
	getEcosolution() {
		this._ecosolutionsService.getEcosolutionById(this.idEcosolution).subscribe((res: any) => {
			const formValue = new EcosolutionForm(res);
			this.form.patchValue(formValue);
		});
	}
	editEcosolution() {
		const body = new NewEcosolutionsBody(this._cleantechId, this._mainCategory, this.form.value);
		this._ecosolutionsService.updateEcosolution(this.idEcosolution, body).subscribe((res: any) => {
			const formValue = new EcosolutionForm(res);
			this.form.patchValue(formValue);
		});
	}

	saveEcosolution() {
		if (this.form.valid) {
			this._createEcosolution();
		}
	}
	private _createEcosolution() {
		const body = new NewEcosolutionsBody(this._cleantechId, this._mainCategory, this.form.value);
		this._ecosolutionsService.createEcosolutions(body).subscribe((res) => {
			console.log(res);
		});
	}
}
