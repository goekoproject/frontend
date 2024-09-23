export interface Product {
  code: string
  label: string
  disabled: boolean
}

export interface Subcategory {
  code: string
  label: string
  question: string
  products: Product[]
  disabled?: boolean
}

export interface Category {
  id: string
  code: string
  label: string
  subcategories: Subcategory[]
}
