import { Injectable, inject } from '@angular/core'
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui'
import {
  ClassificationCategoryService,
  ClassificationsService,
  GroupingBuilder,
  GroupingByClassifications,
  ManageCategory,
  ManageSubcategory,
  NewSubcategory,
} from '@goeko/store'
import { of, switchMap } from 'rxjs'

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
  private classificationCategoryService = inject(ClassificationCategoryService)
  private _classificationService = inject(ClassificationsService)

  createSubcategory(grouping: GroupingByClassifications, subcategory: NewSubcategory) {
    return this._classificationService.createSubcategory(subcategory).pipe(
      switchMap((newSubcategory: any) => {
        console.log('response', newSubcategory)
        const updateGrouping = GroupingBuilder.create(grouping).addSubcategory(newSubcategory).build()
        console.log('updateGrouping', updateGrouping)
        return this._classificationService.updateGrouping(grouping.id, updateGrouping)
      }),
    )
  }

  updateSubcategorySelected(subcategorySelected: ManageCategory) {
    return of([])
  }
}
