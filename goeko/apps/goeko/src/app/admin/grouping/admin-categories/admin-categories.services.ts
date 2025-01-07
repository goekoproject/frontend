import { Injectable, inject } from '@angular/core'
import {
  ClassificationsService,
  GroupingBuilder,
  GroupingByClassifications,
  NewProduct,
  NewSubcategory,
  NewUpdateGrouping,
  Product,
  SubcategoryResponse,
  UpdateSubcategory,
} from '@goeko/store'
import { Observable } from 'rxjs'

export function equalPrimitives(a: any, b: any) {
  return a.id === b.id
}

@Injectable()
export class AdminCategoriesService {
  private _classificationService = inject(ClassificationsService)

  addSubcategoryToGrouping(grouping: GroupingByClassifications, subcategory: SubcategoryResponse[]) {
    const updateGrouping = GroupingBuilder.create(grouping).addSubcategories(subcategory).build()
    console.log('updateGrouping', updateGrouping)
    return this._classificationService.updateGrouping(grouping.id, updateGrouping)
  }
  removeSubcategoryGrouping(grouping: GroupingByClassifications, categoryId: string, subcategoryId: string) {
    const updateGrouping = GroupingBuilder.create(grouping).removeSubcategory(categoryId, subcategoryId).build()
    return this._classificationService.updateGrouping(grouping.id, updateGrouping)
  }

  updateProductGrouping(grouping: GroupingByClassifications, categoryId: string, subcategoryId: string, products: Product[]) {
    const updateGrouping = GroupingBuilder.create(grouping).updateProducts(categoryId, subcategoryId, products).build()
    return this._classificationService.updateGrouping(grouping.id, updateGrouping)
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

  getSubcategoriesByCategoryId(categoryId: string) {
    return this._classificationService.getSubcategoriesCategoryId(categoryId)
  }

  createProduct(product: NewProduct) {
    return this._classificationService.createProduct(product)
  }
}
