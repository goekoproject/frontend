import { Component, OnInit } from '@angular/core';
import { FORM_FIELD_DEMO } from './form-field-demo.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Field } from './form-field.model';

@Component({
	selector: 'goeko-demo-container',
	templateUrl: './demo-container.component.html',
	styleUrls: ['./demo-container.component.scss'],
})
export class DemoContainerComponent implements OnInit {
	formField = FORM_FIELD_DEMO;
	form!: FormGroup;
	slideSelected = 0;

	get isSlideSummary() {
		return this.slideSelected + 1 === this.formField.length;
	}
	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.form = this._fb.group({});
		this._createFormGroup();
		console.log(this.form);
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
	addFormGroup(value: any) {
		this.slideSelected = value.index;
		console.log(value);
	}
}
