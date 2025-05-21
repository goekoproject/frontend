import { mapperLocations } from '@goeko/store/util/mapper-locations'
import { UserProfileForm } from '../../user-profile-form.interface'
import { NotificationProfile } from './user-common-payload.model'

export class UserSmePayload {
  name: string
  email: string
  locations: any //TODO:clean any
  website?: string
  employees?: number
  externalId!: string
  comunicationLanguage?: string
  identifier?: string
  country?: string
  notification: NotificationProfile

  constructor(userProfileForm: UserProfileForm) {
    this.name = userProfileForm.name
    this.email = userProfileForm.email
    this.website = userProfileForm.website || undefined
    this.employees = userProfileForm.employees
    this.externalId = userProfileForm.externalId
    this.comunicationLanguage = userProfileForm.comunicationLanguage?.code || undefined
    this.identifier = userProfileForm.identifier
    this.country = userProfileForm.locations[0].country.code
    this.locations = mapperLocations(userProfileForm.locations)
    this.notification = {
      email: userProfileForm.email || undefined,
      phoneNumber: userProfileForm.phoneNumber || undefined,
      lang: userProfileForm.comunicationLanguage?.code || undefined,
      enabled: userProfileForm.generalNotifications,
    }
  }
}
