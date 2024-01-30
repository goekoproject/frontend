import { USER_TYPE } from '../user-type.constants';

export class SmeUser {
  userType = USER_TYPE.SME;
  id!: string;
  name!: string;
  country!: string;
  email!: string;
  website!: string;
  externalId!: string;

  constructor() {}
}
