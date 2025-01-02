import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { TranslateService } from '@ngx-translate/core'
import { forkJoin, map, Observable, shareReplay } from 'rxjs'
import { CLASSIFICATION_CATEGORIES_CODE } from './classification-categories-code.constant'
import {
  Category,
  NewProduct,
  NewSubcategory,
  NewUpdateCategory,
  Product,
  SubcategoryResponse,
  UpdateProduct,
} from './classifications.interface'
import { GroupingType } from './grouping-type.enum'
import { CategoryGrouping, Grouping, GroupingByClassifications, NewUpdateGrouping } from './grouping.interface'
import { mergeCategoriesSectionWithClassificationCategory } from './transform.util'

const sortCategories = (categories: CategoryGrouping[]): CategoryGrouping[] => {
  const order = [
    CLASSIFICATION_CATEGORIES_CODE.CO2_EMISSION,
    CLASSIFICATION_CATEGORIES_CODE.WASTE,
    CLASSIFICATION_CATEGORIES_CODE.WATER,
    CLASSIFICATION_CATEGORIES_CODE.HAZARDOUS_PRODUCT,
  ]
  return categories.sort((a, b) => order.indexOf(a.code) - order.indexOf(b.code))
}
@Injectable({
  providedIn: 'root',
})
export class ClassificationsService {
  private _http = inject(HttpClient)
  private _translateService = inject(TranslateService)
  langSignal = signal(this._translateService.currentLang || this._translateService.defaultLang)
  currentLang = computed(() => (this.langSignal() === 'en' ? 'gb' : this.langSignal()))

  private categories = toSignal(this.getClassificationsCategory(), { initialValue: [] })

  constructor() {
    this._translateService.onLangChange.pipe().subscribe((current) => this.langSignal.set(current.lang))
  }

  /**
   *
   * Grouping
   */
  getGroupingAll(): Observable<Grouping[]> {
    return this._http.get<Grouping[]>('/v1/classifications/grouping/form').pipe(shareReplay(1))
  }
  getGroupingById(id: string): Observable<GroupingByClassifications> {
    return this._http.get<GroupingByClassifications>(`/v1/classifications/grouping/form/${id}`)
  }
  groupingFormCategories(grouping = GroupingType.construction): Observable<CategoryGrouping[]> {
    return this._http
      .get<CategoryGrouping[]>(`/v1/classifications/grouping/form/code/${grouping}/depth/translated?lang=${this.langSignal()}`)
      .pipe(
        map((categories) => sortCategories(categories)),
        shareReplay(1),
      )
  }

  createGrouping(grouping: NewUpdateGrouping) {
    return this._http.post('/v1/classifications/grouping/form', grouping)
  }

  updateGrouping(id: string, grouping: NewUpdateGrouping) {
    return this._http.put(`/v1/classifications/grouping/form/${id}`, grouping)
  }

  /**	Category */

  getCategoryTranslated() : Observable<Category[]> {
    return this._http.get<Category[]>(`/v2/classifications/category/translated?lang=${this.currentLang()}`)
  }

  getCategoryById(id: string): Observable<Category> {
    if (!id) return new Observable()
    return this._http.get<Category>(`/v2/classifications/category/${id}`)
  }

  updateCategory(id: string, category: NewUpdateCategory) {
    return this._http.put(`/v2/classifications/category/${id}`, category)
  }

  createCategory(category: NewUpdateCategory): Observable<Category> {
    return this._http.post<Category>('/v2/classifications/category', category)
  }

  getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>('/v2/classifications/category')
  }
  delteteCategory(id: string) {
    return this._http.delete(`/v2/classifications/category/${id}`)
  }

  getSubcategoriesCategoryId(categoryId: string): Observable<SubcategoryResponse[]> {
    return this._http.get<SubcategoryResponse[]>(`/v2/classifications/category/${categoryId}/subcategories`)
  }

  /** Subcategory*/
  createSubcategory(subcategory: NewSubcategory): Observable<SubcategoryResponse> {
    return this._http.post<SubcategoryResponse>('/v2/classifications/subcategory', subcategory)
  }
  updateSubcategory(id: string, subcategory: NewSubcategory): Observable<SubcategoryResponse> {
    return this._http.put<SubcategoryResponse>(`/v2/classifications/subcategory/${id}`, subcategory)
  }

  getProductBySubcategoryId(subcategoryId: string): Observable<Product[]> {
    return this._http.get<Product[]>(`/v2/classifications/subcategory/${subcategoryId}/products`)
  }
  /** Product */
  createProduct(product: NewProduct) {
    return this._http.post('/v2/classifications/product', product)
  }

  updateProduct(productId: string, product: UpdateProduct) {
    return this._http.put(`/v2/classifications/product/${productId}`, product)
  }

  /** @deprecated */
  getClassificationsCategory(): Observable<any[]> {
    return this._http
      .get<Category[]>('/v1/classifications/category')
      .pipe(map((classificationCategory) => mergeCategoriesSectionWithClassificationCategory(classificationCategory as any)))
  }

  /** @deprecated */
  getClassificationForCategoryTranslated(category: string): Observable<any> {
    return this._http.get<any>(`/v1/classifications/category/translated/${category}?lang=${this.currentLang()}`)
  }

  /** @deprecated */
  getAllDataCategories() {
    const allCategories$ = this.categories().map((category: any) => this.getClassificationForCategoryTranslated(category.code))
    return forkJoin(allCategories$)
  }
}
