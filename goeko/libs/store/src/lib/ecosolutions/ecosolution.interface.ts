import { FiledTranslations } from '../model/field-translations.interface'
import { Picture } from '../model/pictures.interface'
import { Country } from '../user/public-api'

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
  locations: Array<Country>
  pictures?: Picture[]
  nameTranslations: FiledTranslations[]
  descriptionTranslations: FiledTranslations[]
  detailedDescriptionTranslations: FiledTranslations[]
  priceDescriptionTranslations: FiledTranslations[]
}
