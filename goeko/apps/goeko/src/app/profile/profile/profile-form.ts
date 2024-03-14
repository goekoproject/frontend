import { inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export const smeFormGroup = new FormGroup({
  name: new FormControl(),
  country: new FormControl(),
  email: new FormControl('', Validators.email),
  website: new FormControl(),
  externalId: new FormControl(),
});

export const cleanTechFormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  country: new FormControl(),
  email: new FormControl('', Validators.email),
  link: new FormControl(),
  logo: new FormControl(),
  city: new FormControl(),
  externalId: new FormControl(),
});
