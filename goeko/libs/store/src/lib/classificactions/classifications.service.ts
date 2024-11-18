import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { TranslateService } from '@ngx-translate/core'
import { forkJoin, map, Observable, shareReplay } from 'rxjs'
import { CLASSIFICATION_CATEGORIES_CODE } from './classification-categories-code.constant'
import { Category } from './classifications.interface'
import { Grouping, GroupingByClassifications } from './grouping.interface'
import { mergeCategoriesSectionWithClassificationCategory } from './transform.util'

const sortCategories = (categories: Category[]): Category[] => {
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

  getGroupingAll(): Observable<Grouping[]> {
    return this._http.get<Grouping[]>('/v1/classifications/grouping/form').pipe(shareReplay(1))
  }
  getGroupingById(id: string): Observable<GroupingByClassifications> {
    return this._http.get<GroupingByClassifications>(`/v1/classifications/grouping/form/${id}`)
  }
  groupingFormCategories(grouping = 'construction'): Observable<Category[]> {
    return this._http.get<Category[]>(`/v1/classifications/grouping/form/code/${grouping}/depth/translated?lang=${this.langSignal()}`).pipe(
      map((categories) => sortCategories(categories)),
      shareReplay(1),
    )
  }

  getClassificationsCategory(): Observable<any[]> {
    return this._http
      .get<Category[]>('/v1/classifications/category')
      .pipe(map((classificationCategory) => mergeCategoriesSectionWithClassificationCategory(classificationCategory as any)))
  }
  getClassificationForCategoryTranslated(category: string): Observable<any> {
    return this._http.get<any>(`/v1/classifications/category/translated/${category}?lang=${this.currentLang()}`)
  }

  /** @deprecated */
  getAllDataCategories() {
    const allCategories$ = this.categories().map((category: any) => this.getClassificationForCategoryTranslated(category.code))
    return forkJoin(allCategories$)
  }
}
