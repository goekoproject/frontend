import { Classifications, ResponseClassifications } from '../model/classifications.interface'
import { CompanyDetail } from '../model/company-detail.interface'
import { LocationTranslated } from '../model/location-translated.interface'
import { Picture } from '../model/pictures.interface'
import { DocumentEcosolutions } from './ecosolution.interface'
import { ImprovementEcosolution } from './improvement-ecosolution.interface'

/**
 * Ecosolution detail for sme
 */
export interface EcosolutionSearchResponse {
  id: string
  approved: boolean
  certified: boolean
  classification: Classifications
  classifications: ResponseClassifications[]
  companyDetail: CompanyDetail
  countries: string[]
  description: string
  detailedDescription: string
  guarantee: boolean
  guaranteeInYears?: number
  improvement: ImprovementEcosolution
  marketReady: boolean
  paybackPeriodYears: number
  priceDescription?: string
  solutionName: string
  sustainableDevelopmentGoals: number[]
  pictures: Picture[]
  locations: LocationTranslated[]
  documents: DocumentEcosolutions[]
  favourite: boolean
  notInterested: boolean
}
