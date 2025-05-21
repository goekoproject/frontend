import { USER_TYPE } from '../user-type.constants'
import { NotificationProfile } from './users-payload/user-common-payload.model'

export abstract class Actor {
  id!: string
  externalId!: string
  userType = USER_TYPE.EMPTY
  name!: string
  email!: string
  country?: string
  city?: string
  logo?: string
  identifier?: string
  notification?: NotificationProfile
}
