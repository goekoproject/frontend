import { LocationCountry } from '../../model/locations-data.interface'
import { ClassificationCodeRequest, ContactRequest } from '../common-request.interface'

export interface RealStateLoanPayload {
  bankId: string
  classifications: ClassificationCodeRequest[]
  locations: LocationCountry[]
  buildingTypes: string[]
  ownerProfile: string[]
  minimumQuantity: number
  currency: string[]
  contact: ContactRequest
}
