import { Component, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserContextService } from '@goeko/core';
import {
  USER_TYPE,
  CountrySelectOption,
  DataSelect,
  Profile,
  SmeService,
  UserService,
} from '@goeko/store';
import { combineLatest } from 'rxjs';
import { PROFILE_SME } from './profile-sme.constants';
import { PROFILE_CLEANTECH } from './profile-cleantech.constants';

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

  private _userType!: string;
  private _externalId!: string;

  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any
  ) => boolean;
  public defaultSetCountriesSme = defaultSetCountriesSme as (
    o1: CountrySelectOption,
    o2: string
  ) => boolean;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    effect(() => {
      if (this.dataProfile()) {
        this.form.patchValue(this.dataProfile());
        this._selectionCreateTypeForm();
      }
    });
  }

  ngOnInit(): void {}

  private _selectionCreateTypeForm() {
    switch (this._userType) {
      case USER_TYPE.CLEANTECH:
        this._createFormGroupCleanTech();
        return;

      default:
        this._createFormGroupSme();
        return;
    }
  }

  private _createFormGroupSme = () => {
    this.form = this._fb.group({
      name: [''],
      country: [''],
      email: ['', Validators.email],
      website: [''],
      externalId: [this._externalId],
    });
  };

  private _createFormGroupCleanTech() {
    this.form = this._fb.group({
      name: [''],
      country: [''],
      email: ['', Validators.email],
      link: [''],
      logo: [''],
      city: [''],
      externalId: [this._externalId],
    });
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

  private _changeDataProfile(dataProfile: any) {
    this.savedProfileOK = true;
    this._userService.companyDetail = dataProfile;
    setTimeout(() => {
      this.savedProfileOK = false;
    }, 3000);
  }
}
