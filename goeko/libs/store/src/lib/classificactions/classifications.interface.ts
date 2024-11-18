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
  order: number
}

export interface Category {
  id: string
  code: string
  label: Label
  subcategories: Subcategory[]
  enabled: boolean
  order: number
}
