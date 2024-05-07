import { Component, OnInit, effect } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CountrySelectOption,
  DataSelect,
  UserModal,
  UserService,
  UserSwitch
} from '@goeko/store';
import { SideDialogService } from '@goeko/ui';
import { forkJoin, of } from 'rxjs';
import { PROFILE_CLEANTECH } from './profile-cleantech.constants';
import { ProfileFieldset } from './profile-fieldset.interface';
import { ProfileFormFactory } from './profile-form.factory';
import { PROFILE_SME } from './profile-sme.constants';

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


const TYPE_FORM_FOR_USERTYPE: UserSwitch<Array<ProfileFieldset<'sme' | 'cleantech'>>> = {
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

  public formProfile!: Array<ProfileFieldset<'sme'|'cleantech'>>;
  dataProfile = this._userService.userProfile;

  private _userType = this._userService.userType;
  private _externalId = this._userService.externalId;
  public profileImg!: File | string |  undefined;
  public fileProfile: any
  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any
  ) => boolean;
  public defaultSetCountriesSme = defaultSetCountriesSme as (
    o1: CountrySelectOption,
    o2: string
  ) => boolean;

  private _uploadImg$ = () =>  this._userService.uploadImgProfile(this.dataProfile().id, this.profileImg);
  constructor(
    private _sideDialogService: SideDialogService,
    private _userService: UserService
  ) {
    effect(() => {
      this._effectBuildForm();
    });
  }

  ngOnInit() {
    this._sideDialogService.closeDialog();
    this._userService.fetchUser();
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
          this._saveProfileImg();
        }
      });
  }

  updateProfile() { 
    const dataForUpdated = {
      uploadImg : this.profileImg ? this._uploadImg$() : of(null),
      profile : this._userService
      .updateUserProfile(this.dataProfile().id, this.form.value)
    } 
    forkJoin(dataForUpdated).subscribe((dataProfile: any) => {
        this._changeDataProfile(dataProfile.profile);
      });
  }

  private _changeDataProfile(dataProfile: UserModal) {
    this.savedProfileOK = true;
    this.dataProfile.set(dataProfile);
    setTimeout(() => {
      this.savedProfileOK = false;
    }, 3000);
  }

  private _saveProfileImg() {
    return this._uploadImg$().subscribe(() =>{});
  }

  fileChange(file : File) {
    this.profileImg =file;
  }
}
