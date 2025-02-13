import { LocationsCountry } from '../../model/locations.country'
import { Bank, ClassificationFunding, ContactRequest } from '../common-request.interface'

export interface RealEstateLoanResponse {
  id: string
  bank: Bank
  classifications: ClassificationFunding[]
  locations: LocationsCountry[]
  buildingTypes: string[]
  ownerProfile: string[]
  minimumQuantity: number
  currency: string[]
  contact: ContactRequest
  creationDate: string
  financingType: string
  balanceSheet: number
}
