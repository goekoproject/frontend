import { Component, effect } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { CanComponentDeactivate } from '@goeko/business-ui'
import { CountrySelectOption, DataSelect, LocationsCountry, SmeUser, USER_TYPE, UserModal, UserSwitch } from '@goeko/store'
import { AutoUnsubscribe, GoInput } from '@goeko/ui'
import { forkJoin, map, Subject, switchMap, takeUntil } from 'rxjs'
import { PROFILE_BANK } from './profile-bank.constants'
import { PROFILE_CLEANTECH } from './profile-cleantech.constants'
import { ProfileFieldset } from './profile-fieldset.interface'
import { IdentifierPlaceholders, LANG_PROFILE } from './profile-form'
import { ProfileFormFactory } from './profile-form.factory'
import { NotificationProfile } from './profile-payload.model'
import { PROFILE_SME } from './profile-sme.constants'
import { ProfileService } from './profile.service'

//TODO: esto se usa?
export const SELECT_PROFILE = {
  cleantechs: PROFILE_CLEANTECH,
  sme: PROFILE_SME,
  bank: PROFILE_BANK,
}

const defaultSetSuperSelect = (o1: any, o2: any) => {
  if (o1 && o2 && typeof o2 !== 'object') {
    return o1.code.toString() === o2
  }

  if (o1 && o2 && typeof o2 === 'object') {
    return o1.code?.toString() === o2.code?.toString()
  }

  return null
}

const defaultSetCountriesSme = (o1: CountrySelectOption, o2: string) => {
  if (o1 && o2) {
    return o1.code === o2
  }

  return null
}

const TYPE_FORM_FOR_USERTYPE: UserSwitch<Array<ProfileFieldset<'sme' | 'cleantech' | 'bank'>>> = {
  sme: PROFILE_SME,
  cleantech: PROFILE_CLEANTECH,
  bank: PROFILE_BANK,
}

@AutoUnsubscribe()
@Component({
  selector: 'goeko-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [],
})
export class ProfileComponent implements CanComponentDeactivate {
  form!: FormGroup
  savedProfileOK!: boolean
  public USERTYPE = USER_TYPE
  public dataSelect = DataSelect as any

  private get _identifier() {
    return document.getElementById('identifier') as GoInput
  }
  public formSection!: Array<ProfileFieldset<'sme' | 'cleantech' | 'bank'>>
  public dataProfile = this._profieService.userProfile
  public userType = this._profieService.userType
  public dataLang = LANG_PROFILE
  private _externalId = this._profieService.externalId
  private destroy$ = new Subject<void>()

  public profileImg!: File[]
  public countries = this._profieService.countries
  public username = this._profieService.username
  public defaultSetSuperSelect = defaultSetSuperSelect as (o1: any, o2: any) => boolean
  public defaultSetCountriesSme = defaultSetCountriesSme as (o1: CountrySelectOption, o2: string) => boolean

  private _uploadImg$ = (id = this.dataProfile()?.id) => {
    return this._profieService.uploadImgProfile(id, this.profileImg)
  }

  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }
  constructor(
    private _profieService: ProfileService,
    public route: ActivatedRoute,
  ) {
    effect(() => {
      if (this.userType() && !this.form) {
        this._createFormForUserType()
        this._loadDataProfile()
      }
    })
  }

  canDeactivate() {
    return !!this.dataProfile().id
  }

  private _createFormForUserType() {
    this.form = ProfileFormFactory.createProfileForm(this.userType())
    this.formSection = TYPE_FORM_FOR_USERTYPE[this.userType() as keyof typeof TYPE_FORM_FOR_USERTYPE] || []
  }

  private _loadDataProfile() {
    this.form.patchValue(this.dataProfile())
    this.form.get('comunicationLanguage')?.patchValue(this.dataProfile().notification?.lang)
    this.form.get('phoneNumber')?.patchValue(this.dataProfile()?.notification?.phoneNumber)
    this.form.get('externalId')?.patchValue(this._externalId())
    this.form.get('generalNotifications')?.patchValue((this.dataProfile().notification as NotificationProfile).enabled)
    this.form.get('email')?.patchValue(this.dataProfile().notification?.email)
    this._setLocaltionInFormForSme()
  }

  private _setLocaltionInFormForSme() {
    if (this.userType() === USER_TYPE.SME && (this.dataProfile() as SmeUser).locations) {
      this.locationsArrays.clear()
      this._addLocations((this.dataProfile() as SmeUser).locations[0])
    }
  }
  private _addLocations(location: LocationsCountry) {
    this.locationsArrays.push(this._createLocations(location))
  }
  private _createLocations(location: LocationsCountry): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(location.country.code),
        regions: new FormControl(location.country.regions),
      }),
    })
  }
  manageIdentifiers = (codeCountry: string) => {
    if (!this._identifier) {
      return
    }
    this._identifier.placeholder = IdentifierPlaceholders[codeCountry as keyof typeof IdentifierPlaceholders]
  }
  fileChange(file: File[]) {
    this.profileImg = file
  }
  saveProfile() {
    this._profieService
      .createUserProfile(this.form.value)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((dataProfile) => {
          if (dataProfile && this.profileImg) {
            return this._uploadImg$(dataProfile.id).pipe(map((uploadResult) => ({ dataProfile, uploadResult })))
          } else {
            return [{ dataProfile }]
          }
        }),
      )
      .subscribe({
        next: ({ dataProfile }) => {
          this._propageDataUser(dataProfile)
        },
        error: (error) => {
          console.error('Error al crear el perfil', error)
        },
      })
  }

  updateProfile() {
    const profileUpdate$ = this._profieService.updateUserProfile(this.dataProfile().id, this.form.value)

    forkJoin({ profileUpdate: profileUpdate$, imageUpdate: this._uploadImg$() })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dataProfile) => {
          if (dataProfile) {
            this._propageDataUser(dataProfile.profileUpdate)
          }
        },
        error: (error) => {
          console.error('Error al actualizar el perfil', error)
        },
      })
  }

  private _propageDataUser(dataProfile: UserModal) {
    this.dataProfile.set(dataProfile)
  }
}
