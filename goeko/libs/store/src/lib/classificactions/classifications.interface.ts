interface Translation {
  label: string
  lang: string
}

export interface Label {
  translations: Translation[]
}

export interface Question {
  translations: Translation[]
}

export interface Product {
  id: string
  code: string
  label: Label
  enabled: boolean
}
export interface ProductPayload extends NewProduct, UpdateProduct {}
export interface NewProduct {
  subcategoryId: string
  label: Label
}

export interface UpdateProduct {
  label: Label
  enabled: boolean
}

export interface Subcategory {
  id: string
  code: string
  label: Label
  question: Question
  products: Product[] | undefined
  enabled: boolean
  order?: number
}
export interface SubcategoryResponse {
  categoryCode: string
  categoryId: string
  code: string
  creationDateTime: string
  enabled: boolean
  id: string
  label: Label
  question: Question
  updateDateTime: string
}

export interface NewSubcategory {
  categoryId?: string
  label: Label
  question: Question
}

export interface UpdateSubcategory {
  label: Label
  question: Question
  enabled: boolean
}

export interface Category {
  id: string
  code: string
  label: Label
  subcategories: Subcategory[]
  enabled: boolean
  order: number
}

export interface NewUpdateCategory {
  label: Label
  enabled?: boolean
}
