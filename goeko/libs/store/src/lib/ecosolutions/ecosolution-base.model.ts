import { Classifications } from '../model/classifications.interface'
import { TranslatedProperties } from '../model/field-translations.interface'
import { LocationsCountry } from '../model/locations.country'
import { mapperLocations } from '../util/mapper-locations'
import { FromTO, Improvement, Price } from './ecosolution.interface'
import { filterValidTranslations } from './utils/translation-utils'

export interface EcosolutionFormData {
  solutionName: string
  solutionDescription?: string
  detailedDescription?: string
  priceDescription?: string
  yearGuarantee?: number
  reductionPercentage?: FromTO
  operationalCostReductionPercentage?: FromTO
  improvementOtherCategory?: {
    category: string
    reductionPercentage?: FromTO
    operationalCostReductionPercentage?: FromTO
  }
  sustainableDevelopmentGoals?: number[]
  classifications: Array<{
    category: string
    subCategory: string
    products: any
  }>
  paybackPeriodYears?: number
  marketReady?: boolean
  guarantee?: boolean
  certified?: boolean
  approved?: boolean
  locations: any
  nameTranslations: TranslatedProperties[]
  descriptionTranslations: TranslatedProperties[]
  detailedDescriptionTranslations: TranslatedProperties[]
  priceDescriptionTranslations: TranslatedProperties[]
}

interface ImprovementOtherCategory {
  category: string
  reductionPercentage: FromTO
  operationalCostReductionPercentage?: FromTO
}

interface MappedClassificationsResult {
  primary?: Classifications
  all: Classifications[]
}

export class EcosolutionsBody {
  readonly cleantechId: string
  readonly solutionName: string
  readonly solutionDescription?: string
  readonly detailedDescription?: string
  classification?: Classifications
  readonly classifications: Classifications[]
  readonly price?: Price
  readonly improvement?: Improvement
  readonly sustainableDevelopmentGoals?: number[]
  readonly countries?: string[]
  readonly paybackPeriodYears?: number
  readonly marketReady?: boolean
  readonly guarantee?: boolean
  readonly guaranteeInYears?: number
  readonly certified?: boolean
  readonly approved?: boolean
  readonly unit?: string
  readonly currency?: string
  readonly priceDescription?: string
  readonly locations: LocationsCountry[]
  readonly nameTranslations: TranslatedProperties[]
  readonly descriptionTranslations: TranslatedProperties[]
  readonly detailedDescriptionTranslations: TranslatedProperties[]
  readonly priceDescriptionTranslations: TranslatedProperties[]
  readonly improvementOtherCategory: ImprovementOtherCategory[]

  constructor(cleanTechId: string, formValue: EcosolutionFormData) {
    if (!formValue) {
      throw new Error('Faltan los datos del formulario (formValue) para crear EcosolutionsBody')
    }

    this.cleantechId = cleanTechId

    this.solutionName = formValue.solutionName
    this.solutionDescription = formValue.solutionDescription
    this.detailedDescription = formValue.detailedDescription
    this.priceDescription = formValue.priceDescription
    this.guaranteeInYears = formValue.yearGuarantee
    this.paybackPeriodYears = formValue.paybackPeriodYears
    this.marketReady = formValue.marketReady
    this.guarantee = formValue.guarantee
    this.certified = formValue.certified
    this.approved = formValue.approved

    this.improvement = this._mapImprovement(formValue)
    this.improvementOtherCategory = this._mapImprovementOtherCategory(formValue.improvementOtherCategory)
    this.sustainableDevelopmentGoals = formValue.sustainableDevelopmentGoals
    this._setClassificationsDefault()

    this.classifications = this._mapClassifications(formValue.classifications)

    this.locations = mapperLocations(formValue.locations)

    this.nameTranslations = filterValidTranslations(formValue.nameTranslations)
    this.descriptionTranslations = filterValidTranslations(formValue.descriptionTranslations)
    this.detailedDescriptionTranslations = filterValidTranslations(formValue.detailedDescriptionTranslations)
    this.priceDescriptionTranslations = filterValidTranslations(formValue.priceDescriptionTranslations)
  }

  private _mapImprovement(formValue: EcosolutionFormData): Improvement | undefined {
    if (formValue.reductionPercentage || formValue.operationalCostReductionPercentage) {
      return {
        reductionPercentage: {
          from: formValue.reductionPercentage?.from || 0,
          to: formValue.reductionPercentage?.to || 0,
        },
        operationalCostReductionPercentage: {
          from: formValue.operationalCostReductionPercentage?.from || 0,
          to: formValue.operationalCostReductionPercentage?.to || 0,
        },
      }
    }
    return undefined
  }

  private _mapImprovementOtherCategory(formImprovementOther?: EcosolutionFormData['improvementOtherCategory']): ImprovementOtherCategory[] {
    const result: ImprovementOtherCategory[] = []
    if (formImprovementOther && formImprovementOther.category) {
      const otherImprovement: ImprovementOtherCategory = {
        category: formImprovementOther.category,
        reductionPercentage: {
          from: formImprovementOther.reductionPercentage?.from || 0,
          to: formImprovementOther.reductionPercentage?.to || 0,
        },
        operationalCostReductionPercentage: formImprovementOther.operationalCostReductionPercentage
          ? {
              from: formImprovementOther.operationalCostReductionPercentage?.from || 0,
              to: formImprovementOther.operationalCostReductionPercentage?.to || 0,
            }
          : undefined,
      }
      result.push(otherImprovement)
    }
    return result
  }

  private _mapClassifications(formClassifications?: EcosolutionFormData['classifications']): Classifications[] {
    let result: Classifications[] = []
    if (!formClassifications) {
      return result
    }

    const mapped = formClassifications
      .filter((c) => !!c && c.products)
      .map(
        (c): Classifications => ({
          mainCategory: c.category,
          subCategory: c.subCategory,
          products: c.products,
        }),
      )

    result = mapped.filter((c) => c.products.length > 0)

    return result
  }

  /**@deprecated */
  private _setClassificationsDefault() {
    this.classification = {
      mainCategory: 'deprecated',
      subCategory: 'deprecated',
      products: ['deprecated'],
    }
  }
}
