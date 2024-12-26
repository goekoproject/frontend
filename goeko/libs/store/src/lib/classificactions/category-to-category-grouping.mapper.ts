import { Category, Subcategory } from './classifications.interface'
import { NewCategoryForGrouping, NewSubcategoryForGrouping } from './grouping.interface'
export class CategoryMapper {
  static mapCategoryToNewCategoryForGrouping(category: Category): NewCategoryForGrouping {
    return {
      code: category.code,
      order: category.order || 0,
      subcategories: category.subcategories?.filter((sub) => sub.products && sub.products.length > 0).map(CategoryMapper.mapSubcategory),
    }
  }

  static mapSubcategory(subcategory: Subcategory): NewSubcategoryForGrouping {
    return {
      code: subcategory.code,
      order: subcategory.order || 0,
      products: subcategory?.products && subcategory.products?.length > 0 ? subcategory?.products?.map((product) => product.code) : [],
    }
  }
}
