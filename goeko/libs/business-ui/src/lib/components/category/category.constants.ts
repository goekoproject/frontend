import { CATEGORIES } from './category.enum'
export interface CategorySection {
  id: string
  icon: string
  keyLang: string
  code: CATEGORIES
  label: string
}

export const CATEGORY_SECTION: CategorySection[] = [
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
