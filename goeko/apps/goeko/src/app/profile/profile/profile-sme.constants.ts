import { ProfileFieldset } from './profile-fieldset.interface';

export const PROFILE_SME: Array<ProfileFieldset<'sme'>> = [
  {
    legend: 'FORM_LABEL.basicInformation',
    fields: [
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
		controlName: 'employees',
		label: 'FORM_LABEL.numEmployees',
		type: 'number',
	},
      {
        controlName: 'website',
        label: 'FORM_LABEL.website',
        type: 'url',
      },
    ],
  },
  {
    legend: 'FORM_LABEL.yourLocation',
    textSupport: 'FORM_LABEL.yourLocationTextSupport',
    fields: [
      {
        controlName: 'country',
        label: 'FORM_LABEL.country',
        type: 'select-locations',
        dataSelectKey: 'countries',
        required: true,
      },
    ],
  },
];
