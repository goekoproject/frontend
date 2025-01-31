import { inject, Injectable } from '@angular/core'
import { DocumentTypeEcosolutions, EcosolutionsService, PARENT_CODE } from '@goeko/store'

@Injectable({
  providedIn: 'root',
})
export class EcosolutionsManagmentService {
  private _ecosolutions = inject(EcosolutionsService)

  uploadDocumentation(idEcosolution: string, dataFiles: { file: File; typeCertificate: DocumentTypeEcosolutions }[]) {
    const formData = new FormData()
    dataFiles.forEach((data) => {
      const { file, typeCertificate } = data
      const _id = window.crypto.randomUUID()
      formData.append(`${_id}`, file)
      formData.append(
        `${_id}.metadata`,
        JSON.stringify({
          parentDocumentType: PARENT_CODE.CERTIFICATE,
          documentType: typeCertificate.code,
        }),
      )
    })

    return this._ecosolutions.uploadDocumentation(idEcosolution, formData)
  }
}
