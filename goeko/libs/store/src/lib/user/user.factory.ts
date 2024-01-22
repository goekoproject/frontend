import { UserType } from './user-type.constants';
import CleantechsUser from './user-type/cleantechs.model';
import SmeUser from './user-type/sme-user.model';
import { UserBuilder } from './user.builder';
import IUser from './user.model';

type UserSwitch = {
  [key in UserType]: UserBuilder;
};
const USER_TO_CREATE: UserSwitch = {
  sme: new SmeUser(),
  cleantech: new CleantechsUser(),
};

export abstract class UserFactory {
  static createUserProfileBuilder(userType: UserType): UserBuilder {
    return USER_TO_CREATE[userType as keyof typeof USER_TO_CREATE];
  }
}
