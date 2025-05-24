import { TranslatedProperties } from './field-translations.interface'

export interface ClassificationManagment {
  category: CategoryManagment
  subcategory: SubcategoryManagment
  products: ProductManagment[]
}

export interface CategoryManagment {
  id: string
  code: string
  label: TranslationGroup
}

export interface SubcategoryManagment {
  id: string
  code: string
  label: TranslationGroup
}

export interface ProductManagment {
  id: string
  code: string
  label: TranslationGroup
}

export interface TranslationGroup {
  translations: TranslatedProperties[]
}
