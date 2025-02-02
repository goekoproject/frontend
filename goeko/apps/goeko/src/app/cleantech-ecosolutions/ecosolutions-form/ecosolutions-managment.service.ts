import { inject, Injectable } from '@angular/core'
import { ClassificationDocumentType, EcosolutionsService, PARENT_CODE } from '@goeko/store'
import { catchError, forkJoin, throwError } from 'rxjs'

export interface DocumentMetadata {
  file: File | null
  documentType: ClassificationDocumentType
  parentDocumentType: keyof typeof PARENT_CODE
}
export const metadataTechnicalSheet: DocumentMetadata = {
  parentDocumentType: PARENT_CODE.TECHNICAL_SHEET,
  documentType: {
    code: 'DEFAULT',
  },
  file: null,
}
@Injectable({
  providedIn: 'root',
})
export class EcosolutionsManagmentService {
  private _ecosolutions = inject(EcosolutionsService)

  uploadDocumentationCertificate(idEcosolution: string, dataFiles: DocumentMetadata[]) {
    if (!this.validateDataFiles(dataFiles)) {
      return throwError(() => new Error('No files to upload.'))
    }
    const formData = this.buildFormData(dataFiles)
    return this.uploadToEcosolution(idEcosolution, formData)
  }

  uplloadTechicalSheet(idEcosolution: string, data: DocumentMetadata) {
    if (!data.file) {
      return throwError(() => new Error('File missing'))
    }
    if (!data.documentType.code) return
    const formData = new FormData()
    const uniqueId = window.crypto.randomUUID()
    formData.append(uniqueId, data.file)
    formData.append(
      `${uniqueId}`,
      JSON.stringify({
        parentDocumentType: PARENT_CODE.TECHNICAL_SHEET,
        documentType: data.documentType.code,
      }),
    )
    return this.uploadToEcosolution(idEcosolution, formData)
  }

  private validateDataFiles(dataFiles: DocumentMetadata[]): boolean {
    return Array.isArray(dataFiles) && dataFiles.length > 0
  }

  private buildFormData(dataFiles: DocumentMetadata[]): FormData {
    const formData = new FormData()
    dataFiles.forEach((data) => this.appendFileAndMetadata(formData, data))
    return formData
  }

  private appendFileAndMetadata(formData: FormData, data: DocumentMetadata) {
    if (data?.file) {
      const uniqueId = window.crypto.randomUUID()
      formData.append(uniqueId, data?.file as File)
      formData.append(
        `${uniqueId}`,
        JSON.stringify({
          parentDocumentType: PARENT_CODE.CERTIFICATE,
          documentType: data.documentType,
        }),
      )
    } else {
      throwError(() => new Error('File missing'))
    }
  }
  private uploadToEcosolution(idEcosolution: string, formData: FormData) {
    return this._ecosolutions.uploadDocumentation(idEcosolution, formData).pipe(
      catchError((error) => {
        console.error('Error uploading documentation:', error)
        return throwError(() => new Error('Upload failed.'))
      }),
    )
  }

  removeDocument(idEcosolution: string, documentId: string[]) {
    const deleteDocument$ = documentId.map((idDoc) => this._ecosolutions.delteDocumentation(idEcosolution, idDoc))
    return forkJoin(deleteDocument$).pipe(
      catchError((error) => {
        console.error('Error removing documentation:', error)
        return throwError(() => new Error('Remove failed.'))
      }),
    )
  }
}
