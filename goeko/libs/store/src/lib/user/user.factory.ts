import { UserProfileForm } from './user-profile-form.interface';
import { UserType } from './user-type.constants';
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

  static createSmeUserProfileDto(userProfileForm: UserProfileForm) {
    const userProfile = {
    ...userProfileForm,
    country: 'CH',
    locations: _mapLocations(userProfileForm.locations)
  }
    return userProfile;
  }



}
function _mapLocations(locations: any[]): any[] {
  return locations.map(location => ({
    ...location,
    country: {
      code: location.country.code.code,
      regions: location.country.regions.map((region:any) => region.code)
    },
  }));
}