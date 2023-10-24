import { STATUS_SECTION } from './form-field-demo.constants';

export interface Field {
	controlName: string;
	type: string;
	textHelp: string;
	label: string;
	hidden?: boolean;
}

export interface Section {
	id: string;
	keyLang: string;
	status: STATUS_SECTION;
	icon?: string;
	fields?: Field[];
	controlName: string;
	showResult: boolean;
	checked?: boolean;
}
