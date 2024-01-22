import { USER_TYPE } from '../user-type.constants';
import { UserBuilder } from '../user.builder';
import { UserProfile } from '../user.model';

export default class SmeUser extends UserBuilder {
  userType = USER_TYPE.SME;
  constructor() {
    super();
  }
}
