import { Injectable, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { LocationRegions, LocationsService, UserFactory, UserProfileForm, UserService } from '@goeko/store'

@Injectable()
export class ProfileService {
  selectedCodeLang = signal({ code: '', label: '' })
  private _getCountries$ = this._locationsService.getCountrys()

  public countries = toSignal(this._getCountries$, { initialValue: null })
  public regions = signal<Array<LocationRegions> | null>(null)

  public userProfile = this._userService.userProfile
  public userType = this._userService.userType
  public externalId = this._userService.externalId
  public username = this._userService.username
  constructor(
    private _locationsService: LocationsService,
    private _userService: UserService,
  ) {}

  createUserProfile(formValue: UserProfileForm) {
    const userFactory = UserFactory.createProfileDto(formValue, this.userType())
    return this._userService.createUserProfile(userFactory)
  }
  updateUserProfile(id: string, formValue: UserProfileForm) {
    const userFactory = UserFactory.createProfileDto(formValue, this.userType())
    return this._userService.updateUserProfile(id, userFactory)
  }

  uploadImgProfile(id: string, img: File[]) {
    return this._userService.uploadImgProfile(id, img)
  }
}
