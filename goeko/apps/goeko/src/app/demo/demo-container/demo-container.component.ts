import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FORM_FIELD_DEMO } from './form-field-demo.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Field } from './form-field.model';
import { DemoService } from '../demo.services';
import { Router } from '@angular/router';
import { DataSelect } from './select-data.constants';

@Component({
	selector: 'goeko-demo-container',
	templateUrl: './demo-container.component.html',
	styleUrls: ['./demo-container.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'demo-container',
	},
})
export class DemoContainerComponent implements OnInit {
	formField = FORM_FIELD_DEMO;
	form!: FormGroup;
	slideSelected = 0;
	public dataSelect = DataSelect as any;

	isSummarySlide() {
		return this.slideSelected === this.formField.length - 1;
	}
	isBoolean(value: any) {
		return typeof value === 'boolean';
	}
	isArray(value: any) {
		return Array.isArray(value);
	}

	tranformValueArray(value: Array<any>) {
		return value.join(',  ');
	}
	constructor(private _fb: FormBuilder, private _router: Router, private _demoServices: DemoService) {}

	ngOnInit(): void {
		this.form = this._fb.group({});
		this._createFormGroup();
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
		this._demoServices.setDataForm(this.form.value);
		this._router.navigate(['demo/sme/result']);
	}
}
