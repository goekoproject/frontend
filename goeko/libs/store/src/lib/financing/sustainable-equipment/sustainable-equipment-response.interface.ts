import { LocationsCountry } from '../../model/locations.country'
import { Bank, ClassificationFunding, ContactRequest } from '../common-request.interface'

export interface SustainableEquipmentResponse {
  id: string
  bank: Bank
  classifications: ClassificationFunding[]
  locations: LocationsCountry[]
  activityProspectMinimum: number
  balanceSheet: number
  requiredDocuments: string[]
  greenBonusVehicles: boolean
  greenBonusMachines: boolean
  minimumQuantity: number
  currency: string[]
  contact: ContactRequest
  creationDate: string
  financingType: string
}
