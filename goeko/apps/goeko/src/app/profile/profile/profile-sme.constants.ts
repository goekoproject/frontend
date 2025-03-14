import { ProfileFieldset } from './profile-fieldset.interface'

export const PROFILE_SME: Array<ProfileFieldset<'sme'>> = [
  {
    legend: 'FORM_LABEL.basicInformation',
    fields: [
      {
        controlName: 'name',
        label: 'FORM_LABEL.companyName',
        type: 'text',
        required: true,
      },
      {
        controlName: 'email',
        label: 'FORM_LABEL.email',
        type: 'email',
        required: true,
        errorMessage: 'ERRORS_FORM.email',
      },
      {
        controlName: 'comunicationLanguage',
        label: 'FORM_LABEL.comunicationLanguage',
        type: 'lang',
        required: false,
      },

      {
        controlName: 'employees',
        label: 'FORM_LABEL.numEmployees',
        type: 'number',
        required: true,
      },
      {
        controlName: 'website',
        label: 'FORM_LABEL.website',
        type: 'url',
        placeholder: 'www.example.com',
        errorMessage: 'ERRORS_FORM.website',
      },
      /*   {
        controlName: 'phoneNumber',
        label: 'FORM_LABEL.phoneNumber',
        type: 'text',
        placeholder: '0041770000000',
      }, */
    ],
  },
  {
    legend: 'FORM_LABEL.yourLocation',
    fields: [
      {
        controlName: 'country',
        label: 'FORM_LABEL.country',
        type: 'select-locations',
        dataSelectKey: 'countries',
        required: true,
      },
      {
        controlName: 'identifier',
        label: 'FORM_LABEL.companyId',
        type: 'text',
        required: false,
      },
    ],
  },

  {
    fields: [
      {
        controlName: 'generalNotifications',
        label: 'MENU_USER_SME.notificationProfile',
        type: 'checkbox',
        required: false,
      },
    ],
  },
]
