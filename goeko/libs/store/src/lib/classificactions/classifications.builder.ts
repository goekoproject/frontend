import { Category, NewCategoryForGrouping, SubcategoryResponse } from './classifications.interface'
import { GroupingByClassifications, NewUpdateGrouping } from './grouping.interface'

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

  addSubcategory(newSubcategory: SubcategoryResponse): GroupingBuilder {
    const category = this.grouping.classification.find((cat) => cat.id === newSubcategory.categoryId)
    if (category) {
      category.subcategories.push({
        id: newSubcategory.id,
        code: newSubcategory.code,
        label: newSubcategory.label,
        question: newSubcategory.question,
        enabled: newSubcategory.enabled,
        products: [],
      })
    }
    return this
  }
  build(): NewUpdateGrouping {
    const newCategories: NewCategoryForGrouping[] = this.grouping.classification.map(
      (category) =>
        ({
          code: category.code,
          order: category.order,
          subcategories: category.subcategories.map((subcategory) => ({
            code: subcategory.code,
            order: subcategory.order,
          })),
        }) as NewCategoryForGrouping,
    )

    return {
      name: this.grouping.name,
      description: this.grouping.description,
      classification: newCategories,
    }
  }
}
