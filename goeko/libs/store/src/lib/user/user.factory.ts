import { mapperLocations } from '@goeko/core'
import { UserProfileForm } from './user-profile-form.interface'
import { USER_TYPE, UserType } from './user-type.constants'
import { UserCleantechPayload } from './user-type/user-payload.model'
import { UserModal, UserSwitch } from './user-type/user-switch.type'
import { CleantechBuilder, IUserBuilder, SmeBuilder } from './user.builder'

const USER_TO_CREATE: UserSwitch<IUserBuilder<UserModal>> = {
  sme: new SmeBuilder(),
  cleantech: new CleantechBuilder(),
}

export abstract class UserFactory {
  static createUserProfileBuilder(userType: UserType): IUserBuilder<UserModal> {
    return USER_TO_CREATE[userType as keyof typeof USER_TO_CREATE]
  }

  static createProfileDto(userProfileForm: UserProfileForm, userType: UserType) {
    switch (userType) {
      case USER_TYPE.SME:
        return {
          ...userProfileForm,
          companyCountry: undefined, // quitar este campo
          country: userProfileForm.locations[0].country.code.code,
          locations: mapperLocations(userProfileForm.locations)
        }
      default:
        return new UserCleantechPayload(userProfileForm)
    }
  }
}
