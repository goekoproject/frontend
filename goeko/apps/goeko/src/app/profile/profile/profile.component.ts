import { Component, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CountrySelectOption,
  DataSelect,
  Profile,
  UserModal,
  UserService,
  UserSwitch,
} from '@goeko/store';
import { PROFILE_CLEANTECH } from './profile-cleantech.constants';
import { ProfileFormFactory } from './profile-form.factory';
import { PROFILE_SME } from './profile-sme.constants';
import { DialogService } from '@goeko/ui';

export const SELECT_PROFILE = {
  cleantechs: PROFILE_CLEANTECH,
  sme: PROFILE_SME,
};

const defaultSetSuperSelect = (o1: any, o2: any) => {
  if (o1 && o2 && typeof o2 !== 'object') {
    return o1.id.toString() === o2;
  }

  if (o1 && o2 && typeof o2 === 'object') {
    return o1.id.toString() === o2.id.toString();
  }

  return null;
};

const defaultSetCountriesSme = (o1: CountrySelectOption, o2: string) => {
  if (o1 && o2) {
    return o1.code === o2;
  }

  return null;
};

const TYPE_FORM_FOR_USERTYPE: UserSwitch<Profile[]> = {
  sme: PROFILE_SME,
  cleantech: PROFILE_CLEANTECH,
};
@Component({
  selector: 'goeko-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  savedProfileOK!: boolean;
  public dataSelect = DataSelect as any;

  public formProfile!: Profile[];
  dataProfile = this._userService.userProfile;

  private _userType = this._userService.userType;
  private _externalId = this._userService.externalId;
  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any
  ) => boolean;
  public defaultSetCountriesSme = defaultSetCountriesSme as (
    o1: CountrySelectOption,
    o2: string
  ) => boolean;

  constructor(
    private _dialogService: DialogService,
    private _userService: UserService
  ) {
    effect(() => {
      this._effectBuildForm();
    });
  }

  ngOnInit() {
    this._dialogService.closeDialog();
  }
  private _effectBuildForm() {
    if (this.dataProfile()) {
      this.form = ProfileFormFactory.createProfileForm(this._userType());
      this.formProfile =
        TYPE_FORM_FOR_USERTYPE[
          this._userType() as keyof typeof TYPE_FORM_FOR_USERTYPE
        ];
      this.form.patchValue(this.dataProfile());
      this.form.get('externalId')?.patchValue(this._externalId());
    }
  }
  saveProfile() {
    this._userService
      .createUserProfile(this.form.value)
      .subscribe((dataProfile) => {
        if (dataProfile) {
          this._changeDataProfile(dataProfile);
        }
      });
  }

  updateProfile() {
    this._userService
      .updateUserProfile(this.dataProfile().id, this.form.value)
      .subscribe((dataProfile: any) => {
        this._changeDataProfile(dataProfile);
      });
  }

  private _changeDataProfile(dataProfile: UserModal) {
    this.savedProfileOK = true;
    this.dataProfile.set(dataProfile);
    setTimeout(() => {
      this.savedProfileOK = false;
    }, 3000);
  }
}
