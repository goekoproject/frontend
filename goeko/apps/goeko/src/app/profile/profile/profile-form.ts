import { inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export const smeFormGroup = new FormGroup({
  name: new FormControl('',Validators.required),
  email: new FormControl('', Validators.email),
  country: new FormControl('',Validators.required),
  website: new FormControl(),
  externalId: new FormControl(),
});

export const cleanTechFormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.email,Validators.required]),
  country: new FormControl('',Validators.required),
  link: new FormControl(),
  logo: new FormControl(),
  city: new FormControl(),
  externalId: new FormControl(),
});
