import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui';
import { DataSelect, EcosolutionsService, NewEcosolutions, ODS_CODE } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { Field } from 'contentful';
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
	selector: 'goeko-ecosolutions-form',
	templateUrl: './ecosolutions-form.component.html',
	styleUrls: ['./ecosolutions-form.component.scss'],
})
export class EcosolutionsFormComponent implements OnInit {
	public form!: FormGroup;
	public ods = ODS_CODE;
	private _cleantechId!: string;
	private _mainCategory!: string;
	private _fieldsCatagory = FORM_CATEGORIES_QUESTION;
	public questionsCategories!: Array<Field | any>;
	public productsCategories!: any[];
	public defaultSetSuperSelect = defaultSetSuperSelect as (o1: any, o2: any) => boolean;
	public currentLangCode!: string;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _ecosolutionsService: EcosolutionsService,
		private _fb: FormBuilder,
		private _translateServices: TranslateService
	) {}

	ngOnInit(): void {
		this.currentLangCode = this._translateServices.defaultLang;
		this._cleantechId = this._route.snapshot.queryParamMap.get('cleanTechId') as string;
		this._mainCategory = this._route.snapshot.queryParamMap.get('mainCategory') as string;
		this.questionsCategories = this._fieldsCatagory
			.filter((field) => field.controlName.toUpperCase() === this._mainCategory.toUpperCase())
			.map((co2EmissionFields) => co2EmissionFields.fields)
			.flat();
		this._initForm();
		this._changeLangCode();
		this._changeValueSubCategory();
	}
	private _changeLangCode() {
		this._translateServices.onLangChange.subscribe((res) => (this.currentLangCode = res.lang));
	}

	private _initForm() {
		this.form = this._fb.group({
			solutionName: ['', Validators.required],
			price: [''],
			reductionPercentage: [''],
			sustainableDevelopmentGoals: new FormArray([]),
			subCategory: [''],
			products: [''],
		});
		this.addSustainableDevelopmentGoals();
	}

	get sustainableDevelopmentGoals(): FormArray {
		return this.form.get('sustainableDevelopmentGoals') as FormArray;
	}
	addSustainableDevelopmentGoals(): void {
		this.ods.forEach((ods) => this.sustainableDevelopmentGoals.push(this._fb.control(ods)));
	}

	private _changeValueSubCategory() {
		this.form.get('subCategory')?.valueChanges.subscribe((subCategory) => {
			if (subCategory) {
				this.productsCategories = DataSelect[subCategory as keyof typeof DataSelect];
			}
		});
	}

	createEcosolution() {
		const body = this._buildBody();
		this._ecosolutionsService.createEcosolutions(body).subscribe((res) => {
			console.log(res);
		});
	}

	private _buildBody(): NewEcosolutions {
		return {
			cleantechId: this._cleantechId,
			solutionName: this.form.value.solutionName,
			price: {
				amount: this.form.value.price,
				currency: 'EUR',
			},
			improvement: {
				reductionPercentage: this.form.value.reductionPercentage,
			},
			sustainableDevelopmentGoals: this.form.value.sustainableDevelopmentGoals,
			classification: {
				mainCategory: this._mainCategory,
				subCategory: this.form.value.subCategory,
				products: this.form.value.products,
			},
		};
	}
	saveEcosolution() {
		this.createEcosolution();
	}
}
