import { ProfileFieldset } from './profile-fieldset.interface'

export const PROFILE_BANK: Array<ProfileFieldset<'bank'>> = [
  {
    legend: 'FORM_LABEL.basicInformation',
    fields: [
      {
        controlName: 'name',
        label: 'FORM_LABEL.financialName',
        type: 'text',
        required: true,
      },
      {
        controlName: 'contactPerson',
        label: 'FORM_LABEL.contactPerson',
        type: 'text',
        required: true,
      },
      {
        controlName: 'website',
        label: 'FORM_LABEL.website',
        type: 'url',
        placeholder: 'www.example.com',
        errorMessage: 'ERRORS_FORM.website',
      },
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
    ],
  },
  {
    fields: [
      {
        controlName: 'comunicationLanguage',
        label: 'FORM_LABEL.comunicationLanguage',
        type: 'lang',
        required: true,
      },
    ],
  },
]
