import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'
const IdentifierRegexs = {
  ES: /^[A-Z0-9]{9}$/,
  FR: /^[0-9A-Z]{14}$/,
  CH: /^[0-9]{6}$/,
  DE: /^[0-9]{8,10}$/,
  IT: /^[0-9]{11}$/,
}
export function validateCompanyId(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const country = control.parent?.get('companyCountry')?.value
    if (!country) {
      return null
    }
    const id = control.value
    const regex = IdentifierRegexs[country as keyof typeof IdentifierRegexs]

    return regex && !regex.test(id) ? { invalidCompanyId: true } : null
  }
}

export const smeFormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  locations: new FormArray([]),
  website: new FormControl(),
  employees: new FormControl('', [Validators.required, Validators.min(1)]),
  externalId: new FormControl(),
  companyCountry: new FormControl('', Validators.required),
  companyId: new FormControl('', [Validators.required, validateCompanyId()]),
})

export const cleanTechFormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.email, Validators.required]),
  country: new FormControl('', Validators.required),
  link: new FormControl(),
  logo: new FormControl(),
  city: new FormControl(),
  externalId: new FormControl(),
  companyCountry: new FormControl('', Validators.required),
  companyId: new FormControl('', [Validators.required, validateCompanyId()]),
})
