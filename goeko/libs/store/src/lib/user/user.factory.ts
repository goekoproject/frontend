import { UserProfileForm } from './user-profile-form.interface'
import { USER_TYPE, UserType } from './user-type.constants'
import { UserModal, UserSwitch } from './user-type/user-switch.type'
import { UserBankPayload } from './user-type/users-payload/user-bank-payload.model'
import { UserCleantechPayload } from './user-type/users-payload/user-cleantech-payload.model'
import { UserSmePayload } from './user-type/users-payload/user-sme-payload.model'

import { BankBuilder, CleantechBuilder, IUserBuilder, SmeBuilder } from './user.builder'

const USER_TO_CREATE: UserSwitch<IUserBuilder<UserModal>> = {
  sme: new SmeBuilder(),
  cleantech: new CleantechBuilder(),
  bank: new BankBuilder(),
}

export abstract class UserFactory {
  static createUserProfileBuilder(userType: UserType): IUserBuilder<UserModal> {
    const builder = USER_TO_CREATE[userType as keyof typeof USER_TO_CREATE]
    if (!builder) {
      throw new Error(`Unsupported user type: ${userType}`)
    }
    return builder
  }

  static createProfileDto(userProfileForm: UserProfileForm, userType: UserType) {
    switch (userType) {
      case USER_TYPE.SME:
        return new UserSmePayload(userProfileForm)
      case USER_TYPE.BANK: {
        return new UserBankPayload(userProfileForm)
      }
      default:
        return new UserCleantechPayload(userProfileForm)
    }
  }
}
