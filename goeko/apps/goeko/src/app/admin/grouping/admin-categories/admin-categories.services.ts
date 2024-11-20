import { Injectable, Injector, inject } from '@angular/core'
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui'
import { ClassificationCategoryService, ManageCategory, ManageSubcategory } from '@goeko/store'
import { of } from 'rxjs'

export function equalPrimitives(a: any, b: any) {
  return a.id === b.id
}

const mapToCategoriesSectionForOrderBy = (classificationCategory: ManageCategory) => {
  const subcategoriesSections = FORM_CATEGORIES_QUESTION.find((category) => category.code === classificationCategory.code)?.fields
  const getOrderSubcategory = (subcategory: ManageSubcategory) =>
    subcategoriesSections?.find((subcategorySection) => subcategorySection.controlName === subcategory.code)?.order
  return {
    ...classificationCategory,
    subcategories: classificationCategory.subcategories
      ?.map((subcategory) => ({
        ...subcategory,
        order: getOrderSubcategory(subcategory),
      }))
      .sort((a: any, b: any) => a.order - b.order),
  }
}
@Injectable()
export class AdminCategoriesService {
  private injector = inject(Injector)

  constructor(private classificationCategoryService: ClassificationCategoryService) {}

  updateSubcategorySelected(subcategorySelected: ManageCategory) {
    return of([])
  }
}
