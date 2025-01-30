import { inject, Injectable } from '@angular/core'
import { ClassificationsDocumentsService, PARENT_CODE } from '@goeko/store'
import { map } from 'rxjs'

@Injectable()
export class SelectCertificateService {
  private _classificationsDocumentsServices = inject(ClassificationsDocumentsService)

  private _getClassificationsDocuments() {
    return this._classificationsDocumentsServices.getTranslatedDocumentTypeDepth()
  }

  getCertificates() {
    return this._getClassificationsDocuments().pipe(
      map((documents) => documents.find((document) => document.code === PARENT_CODE.CERTIFICATE)?.documentTypes),
    )
  }
}
