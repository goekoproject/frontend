import { USER_TYPE } from '../user-type.constants';
import { UserBuilder } from '../user.builder';

export default class CleantechsUser extends UserBuilder {
  userType = USER_TYPE.CLEANTECH;
  constructor() {
    super();
  }
}
