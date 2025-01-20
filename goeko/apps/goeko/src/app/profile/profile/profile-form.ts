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
  ES: /^[A-Z][0-9]{7}[0-9A-Z]$/,
  FR: /^[0-9]{9}$/,
  CH: /^CHE-[0-9]{3}\.[0-9]{3}\.[0-9]{3}$/,
  DE: /^DE[0-9]{9}$|^DE[0-9]{10}$/,
  IT: /^[0-9]{11}$/,
}
export function validateSmeIdentifier(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstLocation = control?.get('locations')?.value?.[0]?.country?.code
    const identifierControl = control.get('identifier') as FormControl
    if (!firstLocation) {
      return null
    }

    const id = control.value.identifier
    const regex = IdentifierRegexs[firstLocation as keyof typeof IdentifierRegexs]
    if (regex && !regex.test(id)) {
      identifierControl.setErrors({ invalidSmeIdentifier: true })
      return { invalidSmeIdentifier: true }
    } else {
      identifierControl.setErrors(null)
    }
    return null
  }
}

export function validateCleanTechIdentifier(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const country = control.parent?.get('country')?.value

    if (!country) {
      return null
    }

    const id = control.value
    const regex = IdentifierRegexs[country as keyof typeof IdentifierRegexs]

    return regex && !regex.test(id) ? { invalidCleantechIdentifier: true } : null
  }
}

export const smeFormGroup = new FormGroup(
  {
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    locations: new FormArray([], Validators.required),
    website: new FormControl(),
    employees: new FormControl('', [Validators.required, Validators.min(1)]),
    externalId: new FormControl(),
    comunicationLanguage: new FormControl(''),
    identifier: new FormControl(''),
    phoneNumber: new FormControl('', [Validators.pattern(/^[0-9]{10,15}$/)]),
    generalNotifications: new FormControl(false),
  },
  {
    validators: validateSmeIdentifier(),
  },
)

export const cleanTechFormGroup = new FormGroup(
  {
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    country: new FormControl('', Validators.required),
    link: new FormControl(),
    logo: new FormControl(),
    city: new FormControl(),
    externalId: new FormControl(),
    comunicationLanguage: new FormControl(''),
    identifier: new FormControl('', []),
    phoneNumber: new FormControl('', [Validators.pattern(/^[0-9]{10,15}$/)]),
  },
  {
    validators: validateCleanTechIdentifier(),
  },
)

export const bankFormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  website: new FormControl(''),
  externalId: new FormControl(),
  locations: new FormArray([], Validators.required),
  contactPerson: new FormControl(''),
  email: new FormControl('', [Validators.email]),
  phoneNumber: new FormControl('', [Validators.pattern(/^[0-9]{10,15}$/)]),
  comunicationLanguage: new FormControl(''),
})
