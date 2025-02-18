import { FinancingTypeLead } from '../model/financing-type.enum'

export interface LeadBankPayload {
  bankId: string
  smeId: string
  financingId: string
  financingType: FinancingTypeLead
  message: string
}
