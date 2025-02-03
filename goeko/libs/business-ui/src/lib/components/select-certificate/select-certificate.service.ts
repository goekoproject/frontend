import { inject, Injectable } from '@angular/core'
import { ClassificationsDocumentsService, PARENT_CODE } from '@goeko/store'
import { TranslateService } from '@ngx-translate/core'
import { distinctUntilChanged, map, of, shareReplay, startWith, switchMap } from 'rxjs'

@Injectable()
export class SelectCertificateService {
  private _classificationsDocumentsServices = inject(ClassificationsDocumentsService)
  private _translateService = inject(TranslateService)

  private _getClassificationsDocuments() {
    return this._classificationsDocumentsServices.getTranslatedDocumentTypeDepth()
  }

  getCertificates() {
    return this._getClassificationsDocuments().pipe(
      shareReplay(1),
      map((documents) => documents.find((document) => document.code === PARENT_CODE.CERTIFICATE)?.documentTypes),
    )
  }
  getCertificateTranslated() {
    return this._translateService.onLangChange.pipe(
      startWith(null),
      distinctUntilChanged((prev, curr) => prev?.lang === curr?.lang),
      switchMap(() => this.getCertificates()),
      shareReplay(1),
    )
  }
}
