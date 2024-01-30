import { USER_TYPE } from '../user-type.constants';

export class CleantechsUser {
  id!: string;
  name!: string;
  country!: string;
  email!: string;
  link!: string;
  logo!: string;
  city!: string;
  externalId!: string;
  userType = USER_TYPE.CLEANTECH;
  constructor() {}
}
