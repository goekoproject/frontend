import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'

export const LANG_PROFILE = [
  { code: 'en', keyLang: 'LANGS.en' },
  { code: 'es', keyLang: 'LANGS.es' },
  { code: 'fr', keyLang: 'LANGS.fr' },
]
export const IdentifierPlaceholders = {
  ES: 'B12345678',
  FR: '123456789',
  CH: 'CHE-123.456.789',
  DE: 'DE123456789',
  IT: '12345678901',
}

const IdentifierRegexs = {
  ES: /^[A-HJ-NP-U]\d{7}[A-Z0-9]$/,
  FR: /^[0-9]{9}$/,
  CH: /^CHE-[0-9]{3}\.[0-9]{3}\.[0-9]{3}$/,
  DE: /^DE[0-9]{9}$|^DE[0-9]{10}$/,
  IT: /^[0-9]{11}$/,
}
const MessageFprIdentifier = {
  ES: 'ERRORS_FORM.cif',
  FR: 'ERRORS_FORM.siret',
  CH: 'ERRORS_FORM.uid',
  DE: 'ERRORS_FORM.steuer',
  IT: 'ERRORS_FORM.piva',
}
export function validateSmeIdentifier(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstLocation = control?.get('locations')?.value?.[0]?.country?.code as keyof typeof IdentifierRegexs
    const identifierControl = control.get('identifier') as FormControl
    if (!firstLocation) {
      return null
    }

    const identifier = control.value.identifier
    if (!identifier) {
      return null
    }
    const regex = IdentifierRegexs[firstLocation]
    if (regex && !regex.test(identifier)) {
      identifierControl.setErrors({ invalidSmeIdentifier: MessageFprIdentifier[firstLocation] })
      identifierControl.markAsTouched()
      identifierControl.markAsDirty()
      return { invalidSmeIdentifier: 'ERRORS_FORM.cif' }
    } else {
      identifierControl.setErrors(null)
    }

    return null
  }
}

export function validateCleanTechIdentifier(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const country = control?.get('country')?.value as keyof typeof IdentifierRegexs

    if (!country) {
      return null
    }

    const identifier = control.value.identifier
    const regex = IdentifierRegexs[country as keyof typeof IdentifierRegexs]
    const identifierControl = control.get('identifier') as FormControl

    if (!identifier) {
      return null
    }
    if (regex && !regex.test(identifier)) {
      identifierControl.setErrors({ invalidSmeIdentifier: MessageFprIdentifier[country] })
      identifierControl.markAsTouched()
      identifierControl.markAsDirty()
      return { invalidSmeIdentifier: MessageFprIdentifier[country] }
    } else {
      identifierControl.setErrors(null)
    }
    return null
  }
}

export const smeFormGroup = new FormGroup(
  {
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    locations: new FormArray([], Validators.required),
    website: new FormControl('', [Validators.pattern(/^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]),
    employees: new FormControl('', [Validators.required, Validators.min(1)]),
    externalId: new FormControl(),
    comunicationLanguage: new FormControl(''),
    identifier: new FormControl(''),
    phoneNumber: new FormControl('', [Validators.pattern(/^[0-9]{10,15}$/)]),
    generalNotifications: new FormControl(false),
  },

  { validators: validateSmeIdentifier() },
)

export const cleanTechFormGroup = new FormGroup(
  {
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    country: new FormControl('', Validators.required),
    link: new FormControl('', [Validators.pattern(/^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]),
    logo: new FormControl(),
    city: new FormControl(),
    externalId: new FormControl(),
    comunicationLanguage: new FormControl(''),
    identifier: new FormControl('', []),
    phoneNumber: new FormControl('', [Validators.pattern(/^[0-9]{10,15}$/)]),
  },
  { validators: validateCleanTechIdentifier() },
)

export const bankFormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  website: new FormControl('', [Validators.pattern(/^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]),
  externalId: new FormControl(),

  // logo: new FormControl(),
  locations: new FormArray([], Validators.required),
  contactPerson: new FormControl(''),
  email: new FormControl('info@goeko.ch', [Validators.email]),
  phoneNumber: new FormControl('000000000', [Validators.pattern(/^[0-9]{10,15}$/)]),
  comunicationLanguage: new FormControl(''),
})
