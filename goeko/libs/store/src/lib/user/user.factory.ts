import { LocationProvider } from '../model/location-provider.interface'
import { UserProfileForm } from './user-profile-form.interface'
import { USER_TYPE, UserType } from './user-type.constants'
import { UserBankPayload, UserCleantechPayload } from './user-type/user-payload.model'
import { UserModal, UserSwitch } from './user-type/user-switch.type'
import { BankBuilder, CleantechBuilder, IUserBuilder, SmeBuilder } from './user.builder'

const USER_TO_CREATE: UserSwitch<IUserBuilder<UserModal>> = {
  sme: new SmeBuilder(),
  cleantech: new CleantechBuilder(),
  bank: new BankBuilder(),
}
export function mapperLocations(locations: LocationProvider[]): any[] {
  return locations.map((location: LocationProvider | any) => ({
    ...location,
    country: {
      code: location?.country?.code,
      regions:
        location?.country?.regions &&
        location?.country?.regions.length > 0 &&
        location?.country?.regions?.every((region: any) => region.code)
          ? location?.country?.regions?.map((region: any) => region.code)
          : undefined,
    },
  }))
}

export abstract class UserFactory {
  static createUserProfileBuilder(userType: UserType): IUserBuilder<UserModal> {
    const builder = USER_TO_CREATE[userType as keyof typeof USER_TO_CREATE]
    if (!builder) {
      throw new Error(`Unsupported user type: ${userType}`)
    }
    return builder
  }

  //TODO: fix code smell
  static createProfileDto(userProfileForm: UserProfileForm, userType: UserType) {
    switch (userType) {
      case USER_TYPE.SME:
        return {
          ...userProfileForm,
          comunicationLanguage: undefined,
          generalNotifications: undefined,
          phoneNumber: undefined,
          country: userProfileForm.locations[0].country.code,
          locations: mapperLocations(userProfileForm.locations),
          notification: {
            email: userProfileForm.email,
            phoneNumber: userProfileForm.phoneNumber,
            lang: userProfileForm.comunicationLanguage?.code,
            enabled: userProfileForm.generalNotifications,
          },
        }
      case USER_TYPE.BANK: {
        return new UserBankPayload(userProfileForm)
      }
      default:
        return new UserCleantechPayload(userProfileForm)
    }
  }
}
