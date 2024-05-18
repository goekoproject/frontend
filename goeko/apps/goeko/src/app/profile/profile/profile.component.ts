import { Component, OnInit, effect } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  CountrySelectOption,
  DataSelect,
  SmeUser,
  USER_TYPE,
  UserFactory,
  UserModal,
  UserService,
  UserSwitch,
} from '@goeko/store';
import { AutoUnsubscribe, SideDialogService } from '@goeko/ui';
import { Subject, distinctUntilChanged, forkJoin, of, takeUntil } from 'rxjs';
import { PROFILE_CLEANTECH } from './profile-cleantech.constants';
import { ProfileFieldset } from './profile-fieldset.interface';
import { ProfileFormFactory } from './profile-form.factory';
import { PROFILE_SME } from './profile-sme.constants';
import { ProfileService } from './profile.service';

export const SELECT_PROFILE = {
  cleantechs: PROFILE_CLEANTECH,
  sme: PROFILE_SME,
};

const defaultSetSuperSelect = (o1: any, o2: any) => {
  if (o1 && o2 && typeof o2 !== 'object') {
    return o1.code.toString() === o2;
  }

  if (o1 && o2 && typeof o2 === 'object') {
    return o1.code?.toString() === o2.code?.toString();
  }

  return null;
};

const defaultSetCountriesSme = (o1: CountrySelectOption, o2: string) => {
  if (o1 && o2) {
    return o1.code === o2;
  }

  return null;
};

const TYPE_FORM_FOR_USERTYPE: UserSwitch<
  Array<ProfileFieldset<'sme' | 'cleantech'>>
> = {
  sme: PROFILE_SME,
  cleantech: PROFILE_CLEANTECH,
};

@AutoUnsubscribe()
@Component({
  selector: 'goeko-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  savedProfileOK!: boolean;
  public dataSelect = DataSelect as any;

  public formSection!: Array<ProfileFieldset<'sme' | 'cleantech'>>;
  public dataProfile = this._userService.userProfile;
  private _userType = this._userService.userType;
  private _externalId = this._userService.externalId;
  private destroy$ = new Subject<void>();

  private _selectedCodeLang = this._profieService.selectedCodeLang;
  public profileImg!: File | string | undefined;
  public countries = this._profieService.countries;
  public regions = this._profieService.regions;

  public fileProfile: any;
  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any
  ) => boolean;
  public defaultSetCountriesSme = defaultSetCountriesSme as (
    o1: CountrySelectOption,
    o2: string
  ) => boolean;

  private _uploadImg$ = () =>
    this._userService.uploadImgProfile(this.dataProfile().id, this.profileImg);

  public  get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray;
  }
  constructor(
    private _sideDialogService: SideDialogService,
    private _userService: UserService,
    private _profieService: ProfileService
  ) {
    effect(() => {});
  }

  ngOnInit() {
    this._sideDialogService.closeDialog();
    this._userService.fetchUser();
    this._createFormForUserType();
    this._loadDataProfile();
    this._countryChanges();
  }
  private _createFormForUserType() {
    if (this.dataProfile()) {
      this.form = ProfileFormFactory.createProfileForm(this._userType());
      this.formSection =
        TYPE_FORM_FOR_USERTYPE[
          this._userType() as keyof typeof TYPE_FORM_FOR_USERTYPE
        ];
    }
  }

  private _loadDataProfile() {
    this.form.patchValue(this.dataProfile());
    this.form.get('externalId')?.patchValue(this._externalId());
    this._setLocaltionInFormForSme();
  }

  private _createLocations():FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(),
        regions: new FormControl()
      }),
    });
  }

  private _addLocations() {
    this.locationsArrays.push(this._createLocations());
  }


  private _setLocaltionInFormForSme() {
    if(this._userType() === USER_TYPE.SME && (this.dataProfile() as SmeUser).locations) {
      this.locationsArrays.clear();
   
      (this.dataProfile() as SmeUser).locations.forEach((loc)=> {
        this._addLocations();
        
      })
      this.form.get('locations')?.patchValue((this.dataProfile() as SmeUser).locations);
    }
  }
  private _countryChanges() {
    this.form?.get('country')?.valueChanges.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((country) => {
      this._selectedCodeLang.set(country);
      this._profieService.getRegions();
    });
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
    const userFactory = UserFactory.createSmeUserProfileDto(this.form.value);
    const dataForUpdated = {
      uploadImg: this.profileImg ? this._uploadImg$() : of(null),
      profile: this._userService.updateUserProfile(
        this.dataProfile().id,
        userFactory
      ),
    };
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
    return this._uploadImg$().subscribe(() => {});
  }

  fileChange(file: File) {
    this.profileImg = file;
  }


}
