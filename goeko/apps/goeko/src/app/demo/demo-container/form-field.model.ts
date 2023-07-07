import { STATUS_SECTION } from './form-field-demo.constants';

export interface Field {
	controlName: string;
	type: string;
	textHelp: string;
	label: string;
}

export interface Section {
	nameSection: string;
	status: STATUS_SECTION;
	icon?: string;
	fields?: Field[];
	controlName: string;
}
