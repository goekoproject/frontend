import { inject, Injectable } from '@angular/core'
import { ClassificationDocumentType, EcosolutionsService, PARENT_CODE } from '@goeko/store'

@Injectable({
  providedIn: 'root',
})
export class EcosolutionsManagmentService {
  private _ecosolutions = inject(EcosolutionsService)

  uploadDocumentation(idEcosolution: string, dataFiles: { file: File; documentType: ClassificationDocumentType }[]) {
    const formData = new FormData()
    dataFiles.forEach((data) => {
      const { file, documentType } = data
      const _id = window.crypto.randomUUID()
      formData.append(`${_id}`, file)
      formData.append(
        `${_id}`,
        JSON.stringify({
          parentDocumentType: PARENT_CODE.CERTIFICATE,
          documentType: documentType.code,
        }),
      )
    })

    return this._ecosolutions.uploadDocumentation(idEcosolution, formData)
  }
}
