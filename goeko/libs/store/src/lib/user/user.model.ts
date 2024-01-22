import { UserBuilder } from './user.builder';

export default interface IUser {
  id: string;
  name: string;
  country: string;
  email: string;
  website: string;
  externalId: string;
}

export class UserProfile implements IUser {
  id = '';
  name = '';
  country = '';
  email = '';
  website = '';
  externalId = '';

  constructor(data: UserBuilder) {
    this.id = data.id;
    this.name = data.name;
    this.country = data.country;
    this.email = data.email;
    this.website = data.website;
    this.externalId = data.externalId;
  }
}
