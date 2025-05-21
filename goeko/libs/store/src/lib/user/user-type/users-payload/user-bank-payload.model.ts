import { mapperLocations } from '@goeko/store/util/mapper-locations'
import { NotificationProfile } from './user-common-payload.model'

export class UserBankPayload {
  name: string
  website: string
  externalId: string
  contactPerson: string
  notification: NotificationProfile
  locations: any //TODO:clean any
  logo?: string

  constructor(dataForm: any) {
    this.name = dataForm.name
    this.website = dataForm.website || undefined
    this.externalId = dataForm.externalId
    this.contactPerson = dataForm.contactPerson || undefined
    this.notification = {
      email: 'info@goeko.ch',
      phoneNumber: '9999999',
      lang: dataForm.comunicationLanguage,
    }
    this.locations = mapperLocations(dataForm.locations)
  }
}
