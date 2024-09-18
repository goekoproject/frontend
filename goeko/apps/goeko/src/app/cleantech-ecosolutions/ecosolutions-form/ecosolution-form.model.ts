import { Country, Ecosolutions, FromTO, ReductionPercentage, TranslatedProperties } from '@goeko/store'
export interface GoalChecked {
  value: string
  checked: boolean
}
export class EcosolutionForm {
  solutionName: string
  solutionDescription?: string
  subCategory: string
  products: string[]
  reductionPercentage?: ReductionPercentage
  operationalCostReductionPercentage?: FromTO
  sustainableDevelopmentGoals?: any[] | undefined
  price?: number
  currency?: string
  deliverCountries?: string[]
  paybackPeriodYears?: number
  marketReady?: boolean
  guarantee?: boolean
  certified?: boolean
  approved?: boolean
  yearGuarantee?: number
  priceDescription?: string
  detailedDescription?: string
  locations?: Array<Country>
  nameTranslations!: TranslatedProperties[]
  detailedDescriptionTranslations!: TranslatedProperties[]
  descriptionTranslations!: TranslatedProperties[]
  priceDescriptionTranslations!: TranslatedProperties[]

  constructor(ecosolution: Ecosolutions) {
    this.solutionName = ecosolution.solutionName
    this.solutionDescription = ecosolution.solutionDescription
    this.subCategory = ecosolution.classification.subCategory
    this.products = ecosolution.classification.products
    this.reductionPercentage = ecosolution.improvement?.reductionPercentage
    this.operationalCostReductionPercentage = ecosolution.improvement?.operationalCostReductionPercentage
    this.sustainableDevelopmentGoals = ecosolution.sustainableDevelopmentGoals
    this.price = ecosolution.price?.amount
    this.currency = ecosolution.price?.currency
    this.deliverCountries = ecosolution.countries
    this.paybackPeriodYears = ecosolution.paybackPeriodYears
    this.marketReady = ecosolution.marketReady
    this.guarantee = ecosolution.guarantee
    this.certified = ecosolution.certified
    this.approved = ecosolution.approved
    this.yearGuarantee = ecosolution.guaranteeInYears
    this.priceDescription = ecosolution.priceDescription
    this.detailedDescription = ecosolution.detailedDescription
    this.locations = ecosolution.locations
    this._setNameTranslated(ecosolution)
    this._setDetailedDescriptionTranslations(ecosolution)
    this._setDescriptionTranslations(ecosolution)
    this._setPriceDescriptionTranslations(ecosolution)
  }

  private _setNameTranslated(ecosolution: Ecosolutions) {
    this.nameTranslations = this.getLabelTranslated(ecosolution.nameTranslations, ecosolution.solutionName)
  }
  private _setDetailedDescriptionTranslations(ecosolution: Ecosolutions) {
    this.detailedDescriptionTranslations = this.getLabelTranslated(
      ecosolution.detailedDescriptionTranslations,
      ecosolution.detailedDescription,
    )
  }
  private _setDescriptionTranslations(ecosolution: Ecosolutions) {
    this.descriptionTranslations = this.getLabelTranslated(ecosolution.descriptionTranslations, ecosolution.solutionDescription)
  }

  private _setPriceDescriptionTranslations(ecosolution: Ecosolutions) {
    this.priceDescriptionTranslations = this.getLabelTranslated(ecosolution.priceDescriptionTranslations, ecosolution.priceDescription)
  }
  private getLabelTranslated(labelTranslate: TranslatedProperties[], preValue: string | undefined) {
    if (labelTranslate && labelTranslate.length > 0) {
      return labelTranslate
    } else {
      return [{ lang: 'fr', label: preValue } as TranslatedProperties]
    }
  }
}
