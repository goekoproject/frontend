import { BankUser } from './user-type/bank-user.model';
import { CleantechsUser, SmeUser } from './public-api'

export interface IUserBuilder<T = any> {
  build(): T
  init(data: any): this
}

//TODO:change pattern to use factory pattern
export class SmeBuilder implements IUserBuilder<SmeUser> {
  private smeUser!: SmeUser
  constructor() {}

  public empty(): any {
    return new Object()
  }
  public init(data: any) {
    this.smeUser = new SmeUser()
    this.smeUser.id = data?.id
    this.smeUser.name = data?.name
    this.smeUser.country = data?.country
    this.smeUser.email = data?.email
    this.smeUser.website = data?.website
    this.smeUser.externalId = data?.externalId
    this.smeUser.locations = data?.locations
    this.smeUser.employees = data?.employees
    this.smeUser.identifier = data?.identifier
    this.smeUser.notification = data?.notification
    return this
  }
  build() {
    return this.smeUser
  }
}

export class CleantechBuilder implements IUserBuilder<CleantechsUser> {
  private cleantechUser!: CleantechsUser
  constructor() {}

  public init(data: any) {
    this.cleantechUser = new CleantechsUser()

    this.cleantechUser.id = data?.id
    this.cleantechUser.name = data?.name
    this.cleantechUser.country = data?.country
    this.cleantechUser.email = data?.email
    this.cleantechUser.link = data?.link
    this.cleantechUser.city = data?.city
    this.cleantechUser.logo = data?.logo
    this.cleantechUser.externalId = data?.externalId
    this.cleantechUser.identifier = data?.identifier
    this.cleantechUser.notification = data?.notification
    return this
  }
  build() {
    return this.cleantechUser
  }
}

//TODO:change pattern to use factory pattern
export class BankBuilder implements IUserBuilder<BankUser> {
  private bankUser!: BankUser
  constructor() {}

  public empty(): any {
    return new Object()
  }
  public init(data: any) {
    this.bankUser = new BankUser()
    this.bankUser.id = data?.id
    this.bankUser.name = data?.name
    this.bankUser.country = data?.country
    this.bankUser.email = data?.email
    this.bankUser.website = data?.website
    this.bankUser.externalId = data?.externalId
    this.bankUser.locations = data?.locations
    this.bankUser.contactPerson = data?.contactPerson
    this.bankUser.identifier = data?.identifier
    this.bankUser.notification = data?.notification
    this.bankUser.logo = data?.logo
    return this
  }
  build() {
    return this.bankUser
  }
}
