import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, map, of, shareReplay } from 'rxjs'
import { TranslateChangeService } from '../util/translate-change'
import { EcosolutionResult } from './ecosolution-result.interface'
import { EcosolutionSearchRequest } from './ecosolution-search.request.model'
import { EcosolutionSearchResponse } from './ecosolution-search.response.interface'
import { Ecosolutions } from './ecosolution.interface'

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

  uploadDocumentation(idEcosolution: string, body: FormData) {
    return this._http.post(`/v1/ecosolutions/${idEcosolution}/documentation`, body).pipe(
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

  ecosolutionSearch(body: EcosolutionSearchRequest): Observable<EcosolutionResult[] | null> {
    const _lang = this.lang() === 'gb' ? 'en' : this.lang()

    if (!body || body.classifications.length <= 0) {
      return of(null)
    }
    return this._http.post<{ ecosolutions: EcosolutionResult[] }>(`/v1/ecosolution/search?lang=${_lang}`, body).pipe(
      map((request: { ecosolutions: EcosolutionResult[] }) => request.ecosolutions),
      shareReplay(1),
    )
  }

  getEcosolutionSearchById(id: string, smeId: string): Observable<EcosolutionSearchResponse> {
    const params = {
      lang: this.lang() === 'gb' ? 'en' : this.lang(),
      smeId,
    }

    return this._http.get<EcosolutionSearchResponse>(`/v1/ecosolution/search/detail/${id}`, { params })
  }
}
