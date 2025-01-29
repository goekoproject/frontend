import { inject, Injectable } from '@angular/core'
import { ClassificationsDocumentsService } from '@goeko/store'
import { map } from 'rxjs'

const PARENT_CODE = 'CERTIFICATE'
@Injectable()
export class SelectCertificateService {
  private _classificationsDocumentsServices = inject(ClassificationsDocumentsService)

  private _getClassificationsDocuments() {
    return this._classificationsDocumentsServices.getTranslatedDocumentTypeDepth()
  }

  getCertificates() {
    return this._getClassificationsDocuments().pipe(
      map((documents) => documents.find((document) => document.parentCode === PARENT_CODE)?.documentTypes),
    )
  }
}
