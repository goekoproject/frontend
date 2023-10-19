import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../../form-field.model';
import { Form, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DataSelect } from '../../select-data.constants';

@Component({
	selector: 'goeko-sme-analysis-summary',
	templateUrl: './sme-analysis-summary.component.html',
	styleUrls: ['./sme-analysis-summary.component.scss'],
})
export class SmeAnalysisSummaryComponent {
	@Input() formField!: Section[];
	@Input() element!: Section;
	@Input() form!: FormGroup;
	public dataSelect = DataSelect;

	@Output() editForm: EventEmitter<number> = new EventEmitter();

	isBoolean(value: any) {
		return typeof value === 'boolean';
	}
	isArray(value: any) {
		return Array.isArray(value);
	}

	tranformValueArray(element: Section, value: any) {
		let valueArray;
		const formValue = this.form.value[element.controlName][value.controlName];

		if (this.isArrayOfType(formValue, 'string')) {
			const dataSelect = this.dataSelect[value.controlName as keyof typeof DataSelect];
			valueArray = dataSelect.filter((option) => formValue.includes(option.id.toString()));
		} else {
			valueArray = formValue;
		}

		return valueArray.map((optionSelect: any) => this._translateService.instant(optionSelect.keyLang)).join(',  ');
	}

	addFormGroup(index: any) {
		this.editForm.emit(index);
	}

	constructor(private _translateService: TranslateService) {}

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
}
