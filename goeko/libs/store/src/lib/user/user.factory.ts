import { mapperLocations } from '@goeko/core';
import { UserProfileForm } from './user-profile-form.interface';
import { USER_TYPE, UserType } from './user-type.constants';
import { UserModal, UserSwitch } from './user-type/user-switch.type';
import { CleantechBuilder, IUserBuilder, SmeBuilder } from './user.builder';

const USER_TO_CREATE: UserSwitch<IUserBuilder<UserModal>> = {
  sme: new SmeBuilder(),
  cleantech: new CleantechBuilder(),
};

export abstract class UserFactory {
  static createUserProfileBuilder(userType: UserType): IUserBuilder<UserModal> {
    return USER_TO_CREATE[userType as keyof typeof USER_TO_CREATE];
  }

  static createProfileDto(
    userProfileForm: UserProfileForm,
    userType: UserType,
  ) {
    switch (userType) {
      case USER_TYPE.SME:
        return {
          ...userProfileForm,
          country: 'CH',
          locations: mapperLocations(userProfileForm.locations),
        };
      default:
        return userProfileForm;
    }
  }
}
