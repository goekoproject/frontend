import { ClassificationManagment } from '../model/classifications-managment.interface'
import { TranslatedProperties } from '../model/field-translations.interface'
import { LocationsCountry } from '../model/locations.country'
import { Picture } from '../model/pictures.interface'

export interface Price {
  amount: number
  currency: string
}
export interface FromTO {
  from: number
  to: number | string
}
export interface ReductionPercentage extends FromTO {
  from: number
  to: number | string
}
export interface OperationalCostReductionPercentage extends FromTO {
  from: number
  to: number | string
}
export interface Improvement {
  reductionPercentage: ReductionPercentage
  operationalCostReductionPercentage: OperationalCostReductionPercentage
}

export interface DocumentTypeEcosolutions {
  code: string
  name: string
  description: string
  fieldOrder: number
  parentCode: string
}
export interface DocumentEcosolutions {
  id: string
  url: string
  name: string
  documentType: DocumentTypeEcosolutions
}
export interface ImprovementOtherCategory {
  category: string | any
  reductionPercentage: ReductionPercentage
  operationalCostReductionPercentage: OperationalCostReductionPercentage
}

export interface Ecosolutions {
  id: string
  solutionName: string
  solutionDescription?: string
  classification: any
  classifications: ClassificationManagment[]
  price?: Price
  improvement?: Improvement
  improvementOtherCategory?: ImprovementOtherCategory[]
  sustainableDevelopmentGoals?: number[]
  countries?: string[]
  paybackPeriodYears?: number
  marketReady?: boolean
  guarantee?: boolean
  certified?: boolean
  approved?: boolean
  guaranteeInYears?: number
  priceDescription?: string
  detailedDescription?: string
  locations: Array<LocationsCountry>
  pictures?: Picture[]
  nameTranslations: TranslatedProperties[]
  descriptionTranslations: TranslatedProperties[]
  detailedDescriptionTranslations: TranslatedProperties[]
  priceDescriptionTranslations: TranslatedProperties[]
  documents?: DocumentEcosolutions[]
}
