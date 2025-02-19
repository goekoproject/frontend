import { FinancingTypeLead } from '../../model/financing-type.enum'

export interface LeadCreateBank {
  bankId: string
  smeId: string
  financingId: string
  financingType: FinancingTypeLead
  message: string
}
