import { DataSelect } from '../constants/select-data.constants';

type FieldForm = 'text' | 'email' | 'password' | 'url' | 'select' | 'select-multiple';
export interface Profile<T = 'cleantech' | 'sme' | 'bank'> {
	userType?: T;
	controlName: string;
	label: string;
	type: FieldForm;
	dataSelectKey?: keyof typeof DataSelect;
}