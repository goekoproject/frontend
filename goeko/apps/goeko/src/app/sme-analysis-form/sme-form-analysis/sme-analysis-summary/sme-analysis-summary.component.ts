import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../../form-field.model';
import { Form, FormGroup } from '@angular/forms';

@Component({
	selector: 'goeko-sme-analysis-summary',
	templateUrl: './sme-analysis-summary.component.html',
	styleUrls: ['./sme-analysis-summary.component.scss'],
})
export class SmeAnalysisSummaryComponent {
	@Input() formField!: Section[];
	@Input() element!: Section;
	@Input() form!: FormGroup;

	@Output() editForm: EventEmitter<number> = new EventEmitter();

	isBoolean(value: any) {
		return typeof value === 'boolean';
	}
	isArray(value: any) {
		return Array.isArray(value);
	}

	tranformValueArray(value: Array<any>) {
		return value.join(',  ');
	}

	addFormGroup(index: any) {
		this.editForm.emit(index);
	}
}
