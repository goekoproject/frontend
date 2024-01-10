import { CATEGORIES } from './category.enum';
export interface CategorySection {
  id: string;
  icon: string;
  keyLang: string;
  code: CATEGORIES;
}

export const CATEGORY_SECTION: CategorySection[] = [
  {
    id: 'icon-catagory-co2',
    icon: 'co2',
    keyLang: 'CATEGORIES.co2Emission',
    code: CATEGORIES.CO2_EMISSION,
  },
  {
    id: 'icon-catagory-waste',
    icon: 'waste',
    keyLang: 'CATEGORIES.waste',
    code: CATEGORIES.WASTE,
  },
  {
    id: 'icon-catagory-water',
    icon: 'water',
    keyLang: 'CATEGORIES.water',
    code: CATEGORIES.WATER,
  },
  {
    id: 'icon-catagory-hp',
    icon: 'hp',
    keyLang: 'CATEGORIES.hazardousProduct',
    code: CATEGORIES.HAZARDOUS_PRODUCT,
  },
];
