import { ProfileFieldset } from './profile-fieldset.interface'

export const PROFILE_CLEANTECH: Array<ProfileFieldset<'cleantech'>> = [
  {
    legend: '',
    fields: [
      {
        controlName: 'name',
        label: 'FORM_LABEL.companyName',
        type: 'text',
        required: true,
      },
      {
        controlName: 'email',
        label: 'FORM_LABEL.emailSalesManager',
        type: 'email',
        required: true,
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
        controlName: 'comunicationLanguage',
        label: 'FORM_LABEL.comunicationLanguage',
        type: 'lang',
        required: true,
      },
      /*       {
        controlName: 'identifier',
        label: 'FORM_LABEL.companyId',
        type: 'text',
        required: true,
      }, */
      {
        controlName: 'link',
        label: 'FORM_LABEL.website',
        type: 'url',
        placeholder: 'www.example.com',
      },
      {
        controlName: 'phoneNumber',
        label: 'FORM_LABEL.phoneNumber',
        type: 'text',
        placeholder: '0041770000000',
        //required: true,
      },
      {
        controlName: 'logo',
        label: 'FORM_LABEL.logo',
        type: 'file-link',
        className: 'file-link',
      },
    ],
  },
]
