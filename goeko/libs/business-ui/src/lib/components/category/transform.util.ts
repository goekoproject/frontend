import { ClassificationCategory, ClassificationSubcategory } from '@goeko/store'
import { CATEGORY_SECTION, CategorySection } from './category.constants'

interface MergeWithCategorySection extends CategorySection {
  id: string
  code: string | any
  label: string
  subcategories: ClassificationSubcategory[] | undefined
  icon: string
  keyLang: string
}
export const mergeCategoriesSectionWithClassificationCategory = (classificationCategory: ClassificationCategory[]) =>
  CATEGORY_SECTION.map((category: CategorySection) => {
    const findCategoryData = classificationCategory
      .map((el) => ({
        ...el,
        label: category.label,
      }))
      .find((categoryData) => categoryData.code === category.code)
    return {
      ...category,
      ...findCategoryData,
    } as MergeWithCategorySection
  })
