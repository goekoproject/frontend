import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, map, of } from 'rxjs'
import { TranslateChangeService } from '../util/translate-change'
import { EcosolutionSearchRequest } from './ecosolution-search.request.model'
import { EcosolutionSearchResponse } from './ecosolution-search.response.interface'
import { Ecosolutions } from './new-ecosolution.model'

@Injectable({
  providedIn: 'root',
})
export class EcosolutionsService extends TranslateChangeService {
  constructor(private _http: HttpClient) {
    super()
    this.changeLang()
  }

  getAll() {
    return this._http.get(`/v1/ecosolutions`)
  }

  deleteEcosolution(id: string) {
    return this._http.delete(`/v1/ecosolutions/${id}`)
  }

  updateEcosolution(id: string, body: Ecosolutions) {
    return this._http.put(`/v1/ecosolutions/${id}`, body)
  }

  uploadPicture(idEcosolution: string, files: File[]) {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('file', file)
    })
    return this._http.post(`/v1/ecosolutions/${idEcosolution}/picture`, formData).pipe(
      catchError((error) => {
        console.error('Error uploading image', error)
        return of(null)
      }),
    )
  }
  updatePicture(idEcosolution: string, files: File[]) {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('file', file)
    })
    return this._http.put(`/v1/ecosolutions/${idEcosolution}/picture`, formData).pipe(
      catchError((error) => {
        console.error('Error uploading image', error)
        return of(null)
      }),
    )
  }

  uploadDocumentation(idEcosolution: string, files: File[]) {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('file', file)
    })
    return this._http.post(`/v1/ecosolutions/${idEcosolution}/documentation`, formData).pipe(
      catchError((error) => {
        console.error('Error uploading documentation', error)
        return of(null)
      }),
    )
  }

  getEcosolutionsDocumentationById(id: string) {
    return this._http.get(`/v1/ecosolutions/${id}/documentation`)
  }

  getEcosolutionById(id: string): Observable<Ecosolutions> {
    return this._http.get<Ecosolutions>(`/v1/ecosolutions/${id}`)
  }

  getEcosolutionsByCleantechId(id: string) {
    return this._http.get<Ecosolutions[]>(`/v1/ecosolutions/cleantech/${id}`)
  }

  createEcosolutions(body: Ecosolutions): Observable<any> {
    return this._http.post<Observable<any>>(`/v1/ecosolutions`, body)
  }

  ecosolutionSearch(body: EcosolutionSearchRequest): Observable<EcosolutionSearchResponse[] | null> {
    if (!body || body.classifications.length <= 0) {
      return of(null)
    }
    return this._http
      .post<{ ecosolutions: EcosolutionSearchResponse[] }>(`/v1/ecosolution/search?lang=${this.lang()}`, body)
      .pipe(map((request: { ecosolutions: EcosolutionSearchResponse[] }) => request.ecosolutions))
  }

  getEcosolutionSearchById(id: string, smeId: string): Observable<EcosolutionSearchResponse> {
    const params = {
      lang: this.lang(),
      smeId,
    }

    return this._http.get<EcosolutionSearchResponse>(`/v1/ecosolution/search/detail/${id}`, { params })
  }
}
