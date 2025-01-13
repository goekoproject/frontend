import { RealEstateLoanResponse, SustainableEquipmentResponse } from './public-api'

export interface SearchFinancingResponse {
  sustainableEquipment: SustainableEquipmentResponse[]
  realEstate: RealEstateLoanResponse[]
}
