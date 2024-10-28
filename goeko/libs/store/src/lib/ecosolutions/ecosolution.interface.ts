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

interface Classification {
  mainCategory: string
  subCategory: string
  products: string[]
}

export interface Ecosolutions {
  cleantechId: string
  solutionName: string
  solutionDescription?: string
  classification: Classification
  price?: Price
  improvement?: Improvement
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
}
