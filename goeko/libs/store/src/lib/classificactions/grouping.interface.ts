import { Category } from './classifications.interface'

export interface Grouping {
  id: string
  code: string
  name: string
  description: string
  creationDateTime: string
  updateDateTime: string
}
export interface NewCategoryForGrouping {
  code: string
  subcategories: NewSubcategoryForGrouping[]
  order: number
}
export interface NewSubcategoryForGrouping {
  code: string
  order: number
  products: string[] | undefined
}

export interface NewUpdateGrouping {
  name: string
  description: string
  classification: NewCategoryForGrouping[]
}

export interface GroupingByClassifications extends Grouping {
  classification: Category[]
}

export interface CategoryGrouping {
  id: string
  code: string
  label: string
  subcategories: SubcategoryGrouping[]
  enabled: boolean
  order: number
}
export interface SubcategoryGrouping {
  id: string
  code: string
  label: string
  question: string
  products: ProductGrouping[]
  enabled: boolean
  order?: number
}

export interface ProductGrouping {
  id: string
  code: string
  label: string
  enabled: boolean
}

