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
}

export interface NewUpdateGrouping {
  name: string
  description: string
  classification: NewCategoryForGrouping[]
}

export interface GroupingByClassifications extends Grouping {
  classification: Category[]
}
