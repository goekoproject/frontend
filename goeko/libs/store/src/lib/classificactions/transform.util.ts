import { ClassificationCategory } from '../admin-categories/classifications-category.model'
export enum CATEGORIES {
  CO2_EMISSION = 'co2Emission',
  HAZARDOUS_PRODUCT = 'hazardousProduct',
  WASTE = 'waste',
  WATER = 'waterConsumption',
}
export const CATEGORY_SECTION = [
  {
    id: 'icon-catagory-co2',
    icon: 'co2',
    keyLang: 'CATEGORIES.co2Emission',
    code: CATEGORIES.CO2_EMISSION,
    label: 'CO2 Emission',
  },
  {
    id: 'icon-catagory-waste',
    icon: 'waste',
    keyLang: 'CATEGORIES.waste',
    code: CATEGORIES.WASTE,
    label: 'Waste',
  },
  {
    id: 'icon-catagory-water',
    icon: 'water',
    keyLang: 'CATEGORIES.water',
    code: CATEGORIES.WATER,
    label: 'Water Consumption',
  },
  {
    id: 'icon-catagory-hp',
    icon: 'hp',
    keyLang: 'CATEGORIES.hazardousProduct',
    code: CATEGORIES.HAZARDOUS_PRODUCT,
    label: 'Hazardous Product',
  },
]

export const mergeCategoriesSectionWithClassificationCategory = (classificationCategory: ClassificationCategory[]) =>
  CATEGORY_SECTION.map((category) => {
    const findCategoryData = classificationCategory.find((categoryData) => categoryData.code === category.code)
    return {
      ...category,
      ...findCategoryData,
    } as any
  })
