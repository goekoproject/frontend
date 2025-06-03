import { ClassificationPayload } from './classifications-payload.model'
import { Category, Product, SubcategoryResponse } from './classifications.interface'
import { GroupingByClassifications, NewUpdateGrouping } from './grouping/grouping.interface'

export class GroupingBuilder {
  private grouping: GroupingByClassifications

  constructor(grouping: GroupingByClassifications) {
    this.grouping = grouping
  }

  static create(grouping: GroupingByClassifications): GroupingBuilder {
    return new GroupingBuilder(grouping)
  }

  addCategory(newCategory: Category): GroupingBuilder {
    this.grouping.classification.push(newCategory)
    return this
  }

  addSubcategory(newSubcategory: any): GroupingBuilder {
    const category = this.grouping.classification.find((cat) => cat.id === newSubcategory.categoryId)
    if (category) {
      category.subcategories.push({
        id: newSubcategory.id,
        code: newSubcategory.code,
        label: newSubcategory.label,
        question: newSubcategory.question,
        enabled: newSubcategory.enabled,
        products: newSubcategory.products,
      })
    }
    return this
  }

  removeSubcategory(categoryId: string, subcategoryId: string): GroupingBuilder {
    const category = this.grouping.classification.find((cat) => cat.id === categoryId)
    if (category) {
      category.subcategories = category.subcategories.filter((subcat) => subcat.id !== subcategoryId)
    }
    return this
  }

  addSubcategories(newSubcategories: SubcategoryResponse[]): GroupingBuilder {
    newSubcategories.forEach((newSubcategory) => this.addSubcategory(newSubcategory))
    return this
  }

  updateProducts(categoryId: string, subcategoryId: string, products: Product[]): GroupingBuilder {
    const category = this.grouping.classification.find((cat) => cat.id === categoryId)
    if (category) {
      const subcategory = category.subcategories.find((subcat) => subcat.id === subcategoryId)
      if (subcategory) {
        subcategory.products = subcategory.products && subcategory.products.length > 0 ? products : []
      }
    }
    return this
  }
  build(): NewUpdateGrouping {
    return new ClassificationPayload(this.grouping)
  }
}
