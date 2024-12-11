import { Injectable, inject } from '@angular/core'
import {
  ClassificationsService,
  GroupingBuilder,
  GroupingByClassifications,
  NewSubcategory,
  NewUpdateGrouping,
  UpdateSubcategory,
} from '@goeko/store'
import { switchMap } from 'rxjs'

export function equalPrimitives(a: any, b: any) {
  return a.id === b.id
}

@Injectable()
export class AdminCategoriesService {
  private _classificationService = inject(ClassificationsService)

  addSubcategoryToGrouping(grouping: GroupingByClassifications, subcategory: NewSubcategory) {
    return this._classificationService.createSubcategory(subcategory).pipe(
      switchMap((newSubcategory: any) => {
        console.log('response', newSubcategory)
        const updateGrouping = GroupingBuilder.create(grouping).addSubcategory(newSubcategory).build()
        console.log('updateGrouping', updateGrouping)
        return this._classificationService.updateGrouping(grouping.id, updateGrouping)
      }),
    )
  }

  createSubcategory(subcategory: NewSubcategory) {
    return this._classificationService.createSubcategory(subcategory)
  }
  updateSubcategorySelected(id: string, subcategory: UpdateSubcategory) {
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
}
