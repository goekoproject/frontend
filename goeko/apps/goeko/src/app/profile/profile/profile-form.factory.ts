import { FormGroup } from '@angular/forms';
import { UserSwitch, UserType } from '@goeko/store';
import { bankFormGroup, cleanTechFormGroup, smeFormGroup } from './profile-form';

const PROFILE_FORM: UserSwitch<any> = {
  sme: smeFormGroup,
  cleantech: cleanTechFormGroup,
  bank: bankFormGroup
};

export abstract class ProfileFormFactory {
  static createProfileForm(userType: UserType): FormGroup {
    const selectedFormGroup =
      PROFILE_FORM[userType as keyof typeof PROFILE_FORM];
    return selectedFormGroup;
  }
}
