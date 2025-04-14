import { Classifications } from '../model/classifications.interface'
import { TranslatedProperties } from '../model/field-translations.interface'
import { LocationsCountry } from '../model/locations.country'
import { mapperLocations } from '../util/mapper-locations'
import { Improvement, Price } from './ecosolution.interface'
export function _filterNotNull(items: Array<TranslatedProperties>): TranslatedProperties[] {
  return items.filter((item) => item.label && item.lang)
}
export class EcosolutionsBody {
  cleantechId: string
  solutionName: string
  solutionDescription?: string
  detailedDescription?: string
  classification?: Classifications
  classifications: Classifications[]
  price?: Price
  improvement?: Improvement
  sustainableDevelopmentGoals?: any[]
  countries?: string[]
  paybackPeriodYears?: number
  marketReady?: boolean
  guarantee?: boolean
  guaranteeInYears?: number
  certified?: boolean
  approved?: boolean
  unit?: string
  currency?: string
  priceDescription?: string
  locations: Array<LocationsCountry>
  nameTranslations!: TranslatedProperties[]
  descriptionTranslations!: TranslatedProperties[]
  detailedDescriptionTranslations!: TranslatedProperties[]
  priceDescriptionTranslations!: TranslatedProperties[]
  constructor(cleanTechId: string, mainCategory: string, formValue: any) {
    if (!formValue) {
      throw Error(`Missing form value for create ecosolutions`)
    }
    this.cleantechId = cleanTechId
    this.solutionName = formValue.solutionName
    this.solutionDescription = formValue.solutionDescription
    this.detailedDescription = formValue.detailedDescription
    this.priceDescription = formValue.priceDescription
    this.guaranteeInYears = formValue.yearGuarantee
    this.improvement = {
      reductionPercentage: {
        from: formValue?.reductionPercentage?.from,
        to: formValue?.reductionPercentage?.to,
      },
      operationalCostReductionPercentage: {
        from: formValue.operationalCostReductionPercentage?.from,
        to: formValue?.operationalCostReductionPercentage?.to,
      },
    }
    this.sustainableDevelopmentGoals = formValue.sustainableDevelopmentGoals?.map((goal: any) => goal.code)
    this.classification = formValue.classifications.map((c: any) => ({
      mainCategory: c.category,
      subCategory: c.subCategory,
      products: c.products,
    }))[0]
    this.classifications = formValue.classifications
      .filter((classification: any) => classification.products)
      .map((c: any) => ({
        mainCategory: c.category,
        subCategory: c.subCategory,
        products: c.products,
      }))
    this.countries = undefined
    this.paybackPeriodYears = formValue?.paybackPeriodYears
    this.marketReady = formValue.marketReady
    this.guarantee = formValue.guarantee
    this.certified = formValue.certified
    this.approved = formValue.approved
    this.locations = mapperLocations(formValue.locations)
    this.nameTranslations = _filterNotNull(formValue.nameTranslations)
    this.descriptionTranslations = _filterNotNull(formValue.descriptionTranslations)
    this.detailedDescriptionTranslations = _filterNotNull(formValue.detailedDescriptionTranslations)
    this.priceDescriptionTranslations = _filterNotNull(formValue.priceDescriptionTranslations)
  }
}
