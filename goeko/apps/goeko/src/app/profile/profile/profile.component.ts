import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CanComponentDeactivate } from '@goeko/business-ui';
import {
  CountrySelectOption,
  DataSelect,
  SmeUser,
  USER_TYPE,
  UserModal,
  UserSwitch,
} from '@goeko/store';
import { AutoUnsubscribe, SideDialogService } from '@goeko/ui';
import {
  Subject,
  distinctUntilChanged,
  forkJoin,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
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
  providers: [],
})
export class ProfileComponent implements OnInit, CanComponentDeactivate {
  form!: FormGroup;
  savedProfileOK!: boolean;
  public dataSelect = DataSelect as any;

  public formSection!: Array<ProfileFieldset<'sme' | 'cleantech'>>;
  public dataProfile = this._profieService.userProfile;
  public userType = this._profieService.userType;
  private _externalId = this._profieService.externalId;
  private destroy$ = new Subject<void>();

  private _selectedCodeLang = this._profieService.selectedCodeLang;
  public profileImg!: File[];
  public countries = this._profieService.countries;
  public regions = this._profieService.regions;
  public username = this._profieService.username;
  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any,
  ) => boolean;
  public defaultSetCountriesSme = defaultSetCountriesSme as (
    o1: CountrySelectOption,
    o2: string,
  ) => boolean;

  private _uploadImg$ = () => {
    if (this.profileImg) {
      return this._profieService.uploadImgProfile(
        this.dataProfile().id,
        this.profileImg,
      );
    }
    return of(null);
  };

  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray;
  }
  constructor(
    private _sideDialogService: SideDialogService,
    private _profieService: ProfileService,
    public route: ActivatedRoute,
  ) {}
  canDeactivate() {
    return !!this.dataProfile().id;
  }

  ngOnInit() {
    this._sideDialogService.closeDialog();
    this._profieService.fetchUser();
    this._createFormForUserType();
    this._loadDataProfile();
    this._countryChanges();
  }
  private _createFormForUserType() {
    if (this.dataProfile()) {
      this.form = ProfileFormFactory.createProfileForm(this.userType());
      this.formSection =
        TYPE_FORM_FOR_USERTYPE[
          this.userType() as keyof typeof TYPE_FORM_FOR_USERTYPE
        ];
    }
  }

  private _loadDataProfile() {
    this.form.patchValue(this.dataProfile());
    this.form.get('externalId')?.patchValue(this._externalId());
    this._setLocaltionInFormForSme();
  }

  private _addLocations() {
    this.locationsArrays.push(this._createLocations());
  }

  private _createLocations(): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(),
        regions: new FormControl([]),
      }),
    });
  }
  private _setLocaltionInFormForSme() {
    if (
      this.userType() === USER_TYPE.SME &&
      (this.dataProfile() as SmeUser).locations
    ) {
      this.locationsArrays.clear();

      (this.dataProfile() as SmeUser).locations.forEach(() => {
        this._addLocations();
      });
      this.form
        .get('locations')
        ?.patchValue((this.dataProfile() as SmeUser).locations);
    }
  }
  private _countryChanges() {
    this.form
      ?.get('country')
      ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((country) => {
        this._selectedCodeLang.set(country);
        this._profieService.getRegions();
      });
  }

  saveProfile() {
    this._profieService
      .createUserProfile(this.form.value)
      .pipe(
        switchMap((dataProfile) => {
          if (dataProfile) {
            return this._uploadImg$();
          }
          return of(null);
        }),
        tap((dataProfile) => {
          this._propageDataUser(dataProfile);
        }),
      )
      .subscribe({
        next: (result) => {
          console.log('Perfil creado con éxito', result);
        },
        error: (error) => {
          console.error('Error al crear el perfil', error);
        },
      });
  }

  updateProfile() {
    const profileUpdate$ = this._profieService.updateUserProfile(
      this.dataProfile().id,
      this.form.value,
    );

    forkJoin({ profileUpdate: profileUpdate$, imageUpdate: this._uploadImg$() })
      .pipe(
        tap((dataProfile) => {
          if (dataProfile) {
            this._propageDataUser(dataProfile.profileUpdate);
          }
        }),
      )
      .subscribe({
        next: (result) => {
          console.log('Perfil actualizado con éxito', result);
        },
        error: (error) => {
          console.error('Error al actualizar el perfil', error);
        },
      });
  }

  private _propageDataUser(dataProfile: UserModal) {
    this.savedProfileOK = true;
    this.dataProfile.set(dataProfile);
    setTimeout(() => {
      this.savedProfileOK = false;
    }, 3000);
  }
  fileChange(file: File[]) {
    this.profileImg = file;
  }
}
