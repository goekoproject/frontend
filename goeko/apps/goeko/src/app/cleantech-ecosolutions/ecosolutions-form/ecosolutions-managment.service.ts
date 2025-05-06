import { inject, Injectable } from '@angular/core'
import { EcosolutionsService, NewEcosolutionsBody, UpdatedEcosolutionBody } from '@goeko/store'
import { TranslateAutomaticService } from '@goeko/store/translate/translate-automatic.service'
import { catchError, concatMap, forkJoin, of, throwError } from 'rxjs'
import { DocumentMetadata, EcosolutionsManagmentDocumentsService } from './ecosolutions-managment-documents.service'

export interface EcosolutionsRequestsParams {
  body: NewEcosolutionsBody | UpdatedEcosolutionBody
  ecosolutionsImg?: File[]
  certificates?: DocumentMetadata[]
  technicalSheet?: File | undefined
  documentForRemove?: string[]
  projectFile?: File | undefined
}
@Injectable({
  providedIn: 'root',
})
export class EcosolutionsManagmentService {
  private _ecosolutionsService = inject(EcosolutionsService)
  private _ecosolutionsManagmentDocumentsService = inject(EcosolutionsManagmentDocumentsService)
  private _translateAutomaticService = inject(TranslateAutomaticService)
  public getEcosolutionById(idEcosolution: string) {
    return this._ecosolutionsService.getEcosolutionById(idEcosolution)
  }
  public createEcosolutions(body: NewEcosolutionsBody) {
    return this._ecosolutionsService.createEcosolutions(body)
  }

  public createEcosolutionWithUploads(ecosolutionsRequests: EcosolutionsRequestsParams) {
    const { body, ecosolutionsImg, certificates, technicalSheet, projectFile } = ecosolutionsRequests
    return this._ecosolutionsService.createEcosolutions(body).pipe(
      concatMap((ecosolution) => {
        const uploadPicture$ = this._uploadPicture(ecosolution.id, ecosolutionsImg)
        const uploadCertificates$ = this._ecosolutionsManagmentDocumentsService.uploadCertificates(ecosolution.id, certificates)
        const uploadTechnicalSheet$ = this._ecosolutionsManagmentDocumentsService.uploadTechnicalSheet(ecosolution.id, technicalSheet)
        const uploadProjectFile$ = this._ecosolutionsManagmentDocumentsService.uploadProjectFile(ecosolution.id, projectFile)
        return forkJoin({
          pictures: uploadPicture$,
          certificates: uploadCertificates$,
          technicalSheet: uploadTechnicalSheet$,
          projectFile: uploadProjectFile$,
        })
      }),
      catchError((error) => {
        console.error('Error creating ecosolution with uploads:', error)
        return throwError(() => new Error('Failed to create ecosolution with uploads'))
      }),
    )
  }

  public updateEcosolution(ecosolutionId: string, ecosolutionsRequests: EcosolutionsRequestsParams) {
    const { body, ecosolutionsImg, certificates, technicalSheet, documentForRemove, projectFile } = ecosolutionsRequests
    const updateEcosolutions$ = this._ecosolutionsService.updateEcosolution(ecosolutionId, body as UpdatedEcosolutionBody).pipe(
      catchError((error) => {
        console.error('Error en updateEcosolution:', error)
        return of(null)
      }),
    )

    return forkJoin({
      updateEcosolution: updateEcosolutions$,
      udpateEcosolutionImage: this._ecosolutionsService.updatePicture(ecosolutionId, ecosolutionsImg || []),

      updateEcosolutionCertificate: this._ecosolutionsManagmentDocumentsService.uploadCertificates(ecosolutionId, certificates),
      updateEcosolutionTechnicalSheet: this._ecosolutionsManagmentDocumentsService.uploadTechnicalSheet(ecosolutionId, technicalSheet),
      updateEcosolutionProjectFile: this._ecosolutionsManagmentDocumentsService.uploadProjectFile(ecosolutionId, projectFile),
      removeDocument: this._ecosolutionsManagmentDocumentsService.removeDocument(ecosolutionId, documentForRemove || []),
    }).pipe(
      catchError((error) => {
        console.error('Error updating ecosolution with uploads:', error)
        return throwError(() => new Error('Failed to update ecosolution with uploads'))
      }),
    )
  }

  private _uploadPicture(ecosolutionId: string, ecosolutionsImg: File[] | undefined) {
    if (!ecosolutionsImg || !ecosolutionId) {
      return of(null)
    }
    return this._ecosolutionsService.uploadPicture(ecosolutionId, ecosolutionsImg).pipe(
      catchError((error) => {
        console.error('Error uploading pictures:', error)
        return of({ error: 'Failed to upload pictures', data: null })
      }),
    )
  }

  translateTexts(data: { texts: string[]; originalLanguage: string; targetLanguage: string }) {
    const translateAutomatic = {
      texts: data.texts,
      originalLanguage: data.originalLanguage,
      targetLanguage: data.targetLanguage,
    }
    return this._translateAutomaticService.createTranslate(translateAutomatic)
  }
}
