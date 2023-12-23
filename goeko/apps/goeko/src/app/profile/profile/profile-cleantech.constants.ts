import { Profile } from '@goeko/store';

export const PROFILE_CLEANTECH: Profile<'cleantech'>[] = [
	{
		controlName: 'name',
		label: 'FORM_LABEL.companyName',
		type: 'text',
	},
	{
		controlName: 'country',
		label: 'FORM_LABEL.country',
		type: 'select',
		dataSelectKey: 'countries',
	},
	{
		controlName: 'city',
		label: 'FORM_LABEL.city',
		type: 'text',
	},
	{
		controlName: 'email',
		label: 'FORM_LABEL.emailSalesManager',
		type: 'email',
	},
	{
		controlName: 'link',
		label: 'FORM_LABEL.website',
		type: 'url',
	},
	{
		controlName: 'logo',
		label: 'FORM_LABEL.logo',
		type: 'file-link',
		className: 'file-link',
	},
];
