import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';

function validateCompanyId(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const country = control.parent?.get('companyCountry')?.value;
    const id = control.value;
    let regex;

    switch (country) {
      case 'ES':
        regex = /^[A-Z0-9]{9}$/;
        break;
      case 'FR':
        regex = /^[0-9A-Z]{14}$/;
        break;
      case 'CH':
        regex = /^[0-9]{6}$/;
        break;
      case 'DE':
        regex = /^[0-9]{8,10}$/;
        break;
      case 'IT':
        regex = /^[0-9]{11}$/;
        break;
      default:
        return null;
    }
    return regex && !regex.test(id) ? { invalidCompanyId: true } : null;
  };
}

export const smeFormGroup = new FormGroup({
  name: new FormControl('',Validators.required),
  email: new FormControl('',[Validators.required, Validators.email]),
  locations: new FormArray([]),
  website: new FormControl(),
  employees: new FormControl('',[Validators.required, Validators.min(1)]),
  externalId: new FormControl(),
  companyCountry: new FormControl('', Validators.required),
  companyId: new FormControl('', [Validators.required, validateCompanyId()])
});

export const cleanTechFormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.email,Validators.required]),
  country: new FormControl('',Validators.required),
  link: new FormControl(),
  logo: new FormControl(),
  city: new FormControl(),
  externalId: new FormControl(),
  companyCountry: new FormControl('', Validators.required),
  companyId: new FormControl('', [Validators.required, validateCompanyId()])
});


