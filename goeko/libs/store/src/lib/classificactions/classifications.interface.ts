interface Translation {
  label: string
  lang: string
}

interface Label {
  translations: Translation[]
}

interface Question {
  translations: Translation[]
}

export interface Product {
  id: string
  code: string
  label: Label
  enabled: boolean
}

export interface Subcategory {
  id: string
  code: string
  label: Label
  question: Question
  products: Product[]
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

export interface NewCategoryForGrouping {
  code: string
  subcategories: NewSubcategoryForGrouping[]
  order: number
}

export interface NewSubcategoryForGrouping {
  code: string
  order: number
}

export interface NewProduct {
  subcategoryId: string
  label: Label
}
