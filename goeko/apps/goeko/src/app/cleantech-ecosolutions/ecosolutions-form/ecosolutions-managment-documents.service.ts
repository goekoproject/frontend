import { inject, Injectable } from '@angular/core'
import { ClassificationDocumentType, EcosolutionsService, PARENT_CODE } from '@goeko/store'
import { catchError, of, throwError } from 'rxjs'

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
export class EcosolutionsManagmentDocumentsService {
  private _ecosolutionsService = inject(EcosolutionsService)

  public uploadTechnicalSheet(ecosolutionId: string, technicalSheet: File | undefined) {
    return this._uploadDocumentsTechnicalSheet(ecosolutionId, technicalSheet).pipe(
      catchError((error) => {
        console.error('Error uploading technical sheet:', error)
        return of({ error: 'Failed to upload technical sheet', data: null })
      }),
    )
  }
  private _uploadDocumentsTechnicalSheet(ecosolutionId: string, technicalSheet: File | undefined) {
    if (!technicalSheet) {
      return of(null)
    }
    const metadata = { ...metadataTechnicalSheet, file: technicalSheet }
    return this._buildFormDataTechnicalSheet(ecosolutionId, metadata)
  }
  private _buildFormDataTechnicalSheet(idEcosolution: string, data: DocumentMetadata) {
    if (!data.file) {
      return throwError(() => new Error('File missing'))
    }
    if (!data.documentType.code) {
      return throwError(() => new Error('Missing code'))
    }
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
    return this._uploadEcosolutionsDocumentation(idEcosolution, formData)
  }

  public uploadCertificates(ecosolutionId: string, certificates: DocumentMetadata[] | undefined) {
    return this._uploadDocumentationCertificate(ecosolutionId, certificates).pipe(
      catchError((error) => {
        console.error('Error uploading certificates:', error)
        return of({ error: 'Failed to upload certificates', data: null })
      }),
    )
  }
  private _uploadDocumentationCertificate(ecosolutionId: string, certificates: DocumentMetadata[] | undefined) {
    if (!certificates) {
      return of(null)
    }
    if (!this.validateDataFiles(certificates)) {
      return throwError(() => new Error('No files to upload.'))
    }
    const formData = this._buildFormDataCertificates(certificates)
    return this._uploadEcosolutionsDocumentation(ecosolutionId, formData)
  }

  private validateDataFiles(dataFiles: DocumentMetadata[]): boolean {
    return Array.isArray(dataFiles) && dataFiles.length > 0
  }
  private _buildFormDataCertificates(dataFiles: DocumentMetadata[]): FormData {
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
  private _uploadEcosolutionsDocumentation(idEcosolution: string, formData: FormData) {
    return this._ecosolutionsService.uploadDocumentation(idEcosolution, formData).pipe(
      catchError((error) => {
        console.error('Error uploading documentation:', error)
        return throwError(() => new Error('Upload failed.'))
      }),
    )
  }
}
