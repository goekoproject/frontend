import { Category } from './classifications.interface'

export interface Grouping {
  id: string
  code: string
  name: string
  description: string
  creationDateTime: string
  updateDateTime: string
}

export interface GroupingByClassifications extends Grouping {
  classification: Category[]
}
