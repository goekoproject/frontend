import { LocationsCountry } from '../../model/locations.country'
import { USER_TYPE } from '../user-type.constants'
import { Actor } from './actor.abstracts'

export class BankUser extends Actor {
  override userType = USER_TYPE.BANK
  website?: string
  locations!: Array<LocationsCountry>
  contactPerson!: string

  constructor() {
    super()
  }
}

