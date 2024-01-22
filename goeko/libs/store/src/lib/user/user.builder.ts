import { IBuilder } from '../builder.interface';
import IUser, { UserProfile } from './user.model';

export class UserBuilder implements IBuilder<UserProfile> {
  id!: string;
  name!: string;
  country!: string;
  email!: string;
  website!: string;
  externalId!: string;

  constructor() {}

  public init(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.country = data.country;
    this.email = data.email;
    this.website = data.website;
    this.externalId = data.externalId;
    return this;
  }
  build(): UserProfile {
    return new UserProfile(this);
  }
}
