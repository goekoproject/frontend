import { Category, SubcategoryResponse } from './classifications.interface'
import { GroupingByClassifications, NewCategoryForGrouping, NewUpdateGrouping } from './grouping.interface'

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

  addSubcategories(newSubcategories: SubcategoryResponse[]): GroupingBuilder {
    const tes: any = {
      categoryId: '21dc5c89-15eb-4e4c-bbff-e185bbc31772',
      code: 'SUBCAT-WZFQ98F9US-202412221605',
      order: 1,
      products: ['PROD-5D5BB2PEI9-202412231014'],
    }

    newSubcategories.push(tes)

    newSubcategories.forEach((newSubcategory) => this.addSubcategory(newSubcategory))
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
            order: subcategory.order || 0,
            products: subcategory.products ?? ['PROD-IUU6QX6JA5-202412261938'],
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
