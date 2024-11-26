import { USER_TYPE, UserType } from '../user-type.constants'
import { Actor } from './actor.abstracts'
import { CleantechsUser } from './cleantechs.model'
import { SmeUser } from './sme-user.model'

export type UserSwitch<T> = {
  [key in UserType]?: T
}

export type UserModal = SmeUser | CleantechsUser | Actor

export const USER_DEFAULT: any = {
  userType: USER_TYPE.EMPTY,
  id: '',
  name: '',
  email: '',
  externalId: '',
}
