import { LocationsCountry } from '../../model/locations.country'
import { Bank, ClassificationFunding, ContactRequest } from '../common-request.interface'
import { FinancingTypeLead } from './../../model/financing-type.enum'

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
  financingType: FinancingTypeLead
  balanceSheet: number
}
