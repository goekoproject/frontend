import { mapperLocations } from '../user.factory'

export interface NotificationProfile {
  email: string
  phoneNumber: string
  lang: string
}

export class UserCleantechPayload {
  name: string
  identifier: string
  country: string
  city: string
  email: string
  link: string
  logo: string
  externalId: string
  phoneNumber: string
  notification: NotificationProfile

  constructor(dataForm: any) {
    this.name = dataForm.name
    this.identifier = dataForm.identifier
    this.country = dataForm.country
    this.city = dataForm.city
    this.email = dataForm.email
    this.link = dataForm.link
    this.logo = dataForm.logo
    this.externalId = dataForm.externalId
    this.phoneNumber = dataForm.phoneNumber
    this.notification = {
      email: dataForm.email,
      phoneNumber: dataForm.phoneNumber,
      lang: dataForm.comunicationLanguage?.code,
    }
  }
}

export class UserBankPayload {
  name: string
  website: string
  externalId: string
  contactPerson: string
  notification: NotificationProfile
  locations: any

  constructor(dataForm: any) {
    this.name = dataForm.name
    this.website = dataForm.website
    this.externalId = dataForm.externalId
    this.contactPerson = dataForm.contactPerson
    this.notification = {
      email: dataForm.email,
      phoneNumber: dataForm.phoneNumber,
      lang: dataForm.comunicationLanguage,
    }
    this.locations = mapperLocations(dataForm.locations)
  }
}
