import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { TranslateService } from '@ngx-translate/core'
import { map, Observable, shareReplay } from 'rxjs'
import { ClassificationDocument, ClassificationDocumentType, PARENT_CODE } from './classifications-document.inerface'

@Injectable({
  providedIn: 'root',
})
export class ClassificationsDocumentsService {
  private _http = inject(HttpClient)
  private _translateService = inject(TranslateService)
  private _lang = toSignal(this._translateService.onLangChange.pipe(map((current: any) => current.lang)))
  private langCode = computed(() => this._lang() ?? this._translateService.defaultLang)
  getTranslatedDocumentTypeDepth(): Observable<ClassificationDocument[]> {
    return this._http
      .get<ClassificationDocument[]>(`/v1/classifications/document/type/depth/translated?lang=${this.langCode()}`)
      .pipe(shareReplay(1))
  }

  getDocumentTypeCertificate(): Observable<ClassificationDocumentType[]> {
    return this.getTranslatedDocumentTypeDepth().pipe(
      map((documents) => documents.filter((document) => document.code === PARENT_CODE.CERTIFICATE).flatMap((doc) => doc.documentTypes)),
    )
  }
}
