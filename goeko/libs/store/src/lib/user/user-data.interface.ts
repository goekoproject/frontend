import { Locations } from '../model/locations.interface'

export interface UserData {
  id: string
  name: string
  country: string
  email: string
  externalId: string
  employees: number
  locations: Locations[]
}
