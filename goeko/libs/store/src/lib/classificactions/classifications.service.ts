import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { CODE_LANG } from '@goeko/core'
import { TranslateService } from '@ngx-translate/core'
import { forkJoin, map, Observable, shareReplay } from 'rxjs'
import { Category } from './classifications.interface'
import { mergeCategoriesSectionWithClassificationCategory } from './transform.util'

@Injectable({
  providedIn: 'root',
})
export class ClassificationsService {
  private _http = inject(HttpClient)
  private _translateService = inject(TranslateService)
  langSignal = signal(this._translateService.currentLang || this._translateService.defaultLang)

  private categories = toSignal(this.getClassificationsCategory(), { initialValue: [] })
  groupingFormCategories(grouping: string = 'construction'): Observable<Category[]> {
    return this._http.get<Category[]>(`/v1/classifications/grouping/form/code/${grouping}/depth/translated?lang=fr`).pipe(shareReplay(1))
  }

  constructor() {
    this._translateService.onLangChange
      .pipe()
      .subscribe((current) => this.langSignal.set(current.lang === CODE_LANG.EN ? CODE_LANG.GB : current.lang))
  }

  getClassificationsCategory(): Observable<any[]> {
    return this._http
      .get<Category[]>('/v1/classifications/category')
      .pipe(map((classificationCategory) => mergeCategoriesSectionWithClassificationCategory(classificationCategory)))
  }
  getClassificationForCategoryTranslated(category: string): Observable<any> {
    return this._http.get<any>(`/v1/classifications/category/translated/${category}?lang=${this.langSignal()}`)
  }

  getAllDataCategories() {
    const allCategories$ = this.categories().map((category: any) => this.getClassificationForCategoryTranslated(category.code))
    return forkJoin(allCategories$)
  }
}
