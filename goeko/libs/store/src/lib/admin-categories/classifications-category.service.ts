import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { ManageCategory } from '../model/classifications-subcategory.model'
import { ClassificationCategory } from './classifications-category.model'

@Injectable({ providedIn: 'root' })
export class ClassificationCategoryService {
  langSignal = signal(this._translateService.defaultLang)
  constructor(
    private _httpClient: HttpClient,
    private _translateService: TranslateService,
  ) {
    this._translateService.onLangChange.subscribe((current) => {
      this.langSignal.set(current.lang)
    })
  }

  getClassificationsCategory(): Observable<ClassificationCategory[]> {
    return this._httpClient.get<ClassificationCategory[]>('/v1/classifications/category')
  }
  getClassificationForCategoryTranslated(category: string): Observable<ClassificationCategory> {
    return this._httpClient.get<ClassificationCategory>(`/v1/classifications/category/translated/${category}?lang=${this.langSignal()}`)
  }

  getClassificationById(id: string): Observable<ManageCategory> {
    return this._httpClient.get<ManageCategory>(`/v1/classifications/category/${id}`)
  }

  updateClassificationCategory(categoryId: string, body: ManageCategory) {
    return this._httpClient.put<ManageCategory>(`/v1/classifications/category/${categoryId}`, body)
  }
}
