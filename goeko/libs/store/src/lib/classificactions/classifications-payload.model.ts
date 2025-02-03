import { Category, Subcategory } from './classifications.interface'
import {
  GroupingByClassifications,
  NewCategoryForGrouping,
  NewSubcategoryForGrouping,
  NewUpdateGrouping,
} from './grouping/grouping.interface'

export class ClassificationPayload implements NewUpdateGrouping {
  name: string
  description: string
  classification: NewCategoryForGrouping[]

  constructor(classifications: GroupingByClassifications) {
    this.name = classifications.name
    this.description = classifications.description
    this.classification = this.transformCategoryToNewCategoryForGrouping(classifications.classification)
  }
  private transformCategoryToNewCategoryForGrouping(categories: Category[]): NewCategoryForGrouping[] {
    return categories.map((category) => ({
      code: category.code,
      order: category.order,
      subcategories: this.transformSubcategoryToNewSubcategoryForGrouping(category.subcategories),
    }))
  }

  private transformSubcategoryToNewSubcategoryForGrouping(subcategories: Subcategory[]): NewSubcategoryForGrouping[] {
    return subcategories.map((subcategory) => ({
      code: subcategory.code,
      order: subcategory.order || 0,
      products: subcategory.products ? subcategory.products.map((product) => product.code) : [],
    }))
  }
}
