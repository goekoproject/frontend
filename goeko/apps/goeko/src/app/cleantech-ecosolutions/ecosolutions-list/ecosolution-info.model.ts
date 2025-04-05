import { Ecosolutions, TranslatedProperties } from '@goeko/store'
import { ClassificationManagment } from '@goeko/store/model/classifications-managment.interface'

const getTranslatedValue = (translations: TranslatedProperties[]) => {
  const translation = translations.find((t) => t.lang === document.documentElement.lang)
  return translation ? translation.label : (translations.at(0)?.label as string)
}
interface SubcategoryEcosolutionInfo {
  subcategoryLabel: string
  products: string[]
}
class ClassificationEcosolutionInfo {
  categoryName: string
  categoryCode: string
  subcategory: SubcategoryEcosolutionInfo[]
  constructor(classification: ClassificationManagment) {
    this.categoryName = getTranslatedValue(classification.category.label.translations)
    this.categoryCode = classification.category.code
    this.subcategory = [
      {
        subcategoryLabel: getTranslatedValue(classification.subcategory.label.translations),
        products: classification.products.map((p) => getTranslatedValue(p.label.translations)),
      },
    ]
  }
}
export class EcosolutionInfo {
  id: string
  solutionName: string
  description: string
  category: ClassificationEcosolutionInfo[]
  constructor(ecosolutionInfo: Ecosolutions) {
    this.id = ecosolutionInfo.id as string
    this.solutionName = getTranslatedValue(ecosolutionInfo.nameTranslations)
    this.description = getTranslatedValue(ecosolutionInfo.descriptionTranslations)
    this.category = ecosolutionInfo.classifications.map((ecosolution) => new ClassificationEcosolutionInfo(ecosolution))
  }
}
