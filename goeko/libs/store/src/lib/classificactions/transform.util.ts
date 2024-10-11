import { CATEGORY_SECTION, CategorySection } from '@goeko/business-ui'
import { ClassificationCategory, ClassificationSubcategory } from '../admin-categories/classifications-category.model'

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
    const findCategoryData = classificationCategory.find((categoryData) => categoryData.code === category.code)
    return {
      ...category,
      ...findCategoryData,
    } as MergeWithCategorySection
  })
