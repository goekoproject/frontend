import { Injectable, inject } from '@angular/core'
import {
  ClassificationsService,
  GroupingBuilder,
  GroupingByClassifications,
  NewSubcategory,
  NewUpdateGrouping,
  SubcategoryResponse,
  UpdateSubcategory,
} from '@goeko/store'
import { Observable, switchMap } from 'rxjs'

export function equalPrimitives(a: any, b: any) {
  return a.id === b.id
}

@Injectable()
export class AdminCategoriesService {
  private _classificationService = inject(ClassificationsService)

  addSubcategoryToGrouping(grouping: GroupingByClassifications, subcategory: NewSubcategory) {
    return this.createSubcategory(subcategory).pipe(
      switchMap((newSubcategory: any) => {
        console.log('response', newSubcategory)
        const updateGrouping = GroupingBuilder.create(grouping).addSubcategory(newSubcategory).build()
        console.log('updateGrouping', updateGrouping)
        return this._classificationService.updateGrouping(grouping.id, updateGrouping)
      }),
    )
  }

  createSubcategory(subcategory: NewSubcategory): Observable<SubcategoryResponse> {
    return this._classificationService.createSubcategory(subcategory)
  }
  deleteCategory(id: string) {
    return this._classificationService.delteteCategory(id)
  }
  updateSubcategory(id: string, subcategory: UpdateSubcategory): Observable<SubcategoryResponse> {
    return this._classificationService.updateSubcategory(id, subcategory)
  }

  getProductBySubcategoryId(subcategoryId: string) {
    return this._classificationService.getProductBySubcategoryId(subcategoryId)
  }

  createGrouping(grouping: NewUpdateGrouping) {
    return this._classificationService.createGrouping(grouping)
  }
  updateGrouping(groupingId: string, grouping: NewUpdateGrouping) {
    return this._classificationService.updateGrouping(groupingId, grouping)
  }

  getAllCategories() {
    return this._classificationService.getAllCategories()
  }

  getSubcategoryByCategoryId(categoryId: string) {
    return this._classificationService.getSubcategoryByCategoryId(categoryId)
  }
}
