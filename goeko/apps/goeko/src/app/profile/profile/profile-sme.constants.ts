import { Profile } from '@goeko/store';

export const PROFILE_SME: Profile<'sme'>[] = [
	{
		controlName: 'name',
		label: 'FORM_LABEL.companyName',
		type: 'text',
	},
	{
		controlName: 'email',
		label: 'FORM_LABEL.email',
		type: 'email',
	},
	{
		controlName: 'country',
		label: 'FORM_LABEL.country',
		type: 'select',
		dataSelectKey: 'countries',
		required: true
	},
	{
		controlName: 'website',
		label: 'FORM_LABEL.website',
		type: 'url',
	},
	{
		controlName: 'employees',
		label: 'FORM_LABEL.numEmployees',
		type: 'number',
	},
	
];
