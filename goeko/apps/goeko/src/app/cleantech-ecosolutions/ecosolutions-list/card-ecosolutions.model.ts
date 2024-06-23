import { Classifications, DataSelect, FiledTranslations } from '@goeko/store'
import { TranslateService } from '@ngx-translate/core'

export class CardEcosolutions {
  id: string
  solutionName: string
  mainCategory: string
  products: string[]
  sustainableDevelopmentGoals: number[]
  nameTranslations!: FiledTranslations[]
  constructor(dataEcosolutions: any, translationService: TranslateService) {
    this.id = dataEcosolutions.id
    this.solutionName = dataEcosolutions.solutionName
    this.mainCategory = dataEcosolutions.classification.mainCategory
    this.products = this._getProductTranslated(dataEcosolutions.classification, translationService)
    this.sustainableDevelopmentGoals = dataEcosolutions.sustainableDevelopmentGoals
    this.nameTranslations = dataEcosolutions.nameTranslations
  }

  private _getProductTranslated(classification: Classifications, translationService: TranslateService) {
    return classification.products.map((product) => {
      const productDataSelect = DataSelect[classification.subCategory as keyof typeof DataSelect]?.find(
        (productSelect) => productSelect.id === product,
      )
      if (!productDataSelect) {
        return
      }
      return translationService.instant(productDataSelect.keyLang)
    })
  }
}
