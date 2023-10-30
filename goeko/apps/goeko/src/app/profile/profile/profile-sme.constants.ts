export interface ProfileSme {
	controlName: string;
	label: string;
	type: 'text' | 'email' | 'password' | 'url' | 'select';
}

export const PROFILE_SME: ProfileSme[] = [
	{
		controlName: 'name',
		label: 'FORM_LABEL.companyName',
		type: 'text',
	},
	{
		controlName: 'country',
		label: 'FORM_LABEL.country',
		type: 'text',
	},
	{
		controlName: 'email',
		label: 'FORM_LABEL.email',
		type: 'email',
	},
	{
		controlName: 'website',
		label: 'FORM_LABEL.website',
		type: 'url',
	},
];
