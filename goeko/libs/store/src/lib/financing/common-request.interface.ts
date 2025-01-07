import { Translations } from '../admin-categories/classifications-subcategory.model'
import { Product } from '../classificactions/classifications.interface'

export interface ClassificationCodeRequest {
  mainCategory: string
  subCategory: string
  products: string[]
}
export interface ContactRequest {
  name: string
  email: string
  phoneNumber: string
}

export interface CategoryFunding {
  id: string
  code: string
  label: {
    translations: Translations[]
  }
}

export interface SubcategoryFunding {
  id: string
  code: string
  label: {
    translations: Translations[]
  }
}
export interface ClassificationFunding {
  category: CategoryFunding
  subcategory: SubcategoryFunding
  products: Product[]
}

export interface Bank {
  id: string
  name: string
}
