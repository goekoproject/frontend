import { CleantechsUser, SmeUser } from './public-api';

export interface IUserBuilder<T = any> {
  build(): T;
  init(data: any): this;
}

export class SmeBuilder implements IUserBuilder<SmeUser> {
  private smeUser!: SmeUser;
  constructor() {}

  public empty(): SmeUser {
    return new SmeUser();
  }
  public init(data: any) {
    this.smeUser = new SmeUser();

    this.smeUser.id = data?.id;
    this.smeUser.name = data?.name;
    this.smeUser.country = data?.country;
    this.smeUser.email = data?.email;
    this.smeUser.website = data?.website;
    this.smeUser.externalId = data?.externalId;
    return this;
  }
  build() {
    return this.smeUser;
  }
}

export class CleantechBuilder implements IUserBuilder<CleantechsUser> {
  private cleantechUser!: CleantechsUser;
  constructor() {}

  public init(data: any) {
    this.cleantechUser = new CleantechsUser();

    this.cleantechUser.id = data?.id;
    this.cleantechUser.name = data?.name;
    this.cleantechUser.country = data?.country;
    this.cleantechUser.email = data?.email;
    this.cleantechUser.link = data?.website;
    this.cleantechUser.city = data?.city;
    this.cleantechUser.logo = data?.logo;
    this.cleantechUser.externalId = data?.externalId;
    return this;
  }
  build() {
    return this.cleantechUser;
  }
}
