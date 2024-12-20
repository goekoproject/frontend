import { LocationsCountry } from '../model/locations.country'
import { ClassificationCodeRequest, ContactRequest } from './common-request.interface'

export interface SustainableEquipmentPayload {
  bankId: string
  classifications: ClassificationCodeRequest[]
  locations: LocationsCountry[]
  activityProspectMinimum: number
  balanceSheet?: number
  requiredDocuments: string[]
  minimumQuantity: number
  currency: string[]
  contact: ContactRequest
}
