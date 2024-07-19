import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, of } from 'rxjs'

@Injectable()
export class CleanTechService {
  constructor(private _http: HttpClient) {}

  getByIdExternal(id: string): Observable<any> {
    const _id = encodeURIComponent(id)
    const params = new HttpParams().set('id', _id)
    return this._http.get<any>(`/v1/actor/cleantechs/external`, { params })
  }

  getById(id: string): Observable<any> {
    return this._http.get<any>(`/v1/actor/cleantechs/` + id)
  }

  createDataProfile(body: any) {
    return this._http.post<any>(`/v1/actor/cleantechs`, body)
  }
  updateDataProfile(id: any, body: any) {
    return this._http.put<any>(`/v1/actor/cleantechs/${id}`, body)
  }

  uploadDocument(id: string, file: any) {
    const formData = new FormData()
    formData.append('file', file)
    return this._http.post<any>(`/v1/actor/cleantechs/${id}/documentation`, formData).pipe(
      catchError((error) => {
        console.error('Error uploading image', error)
        return of(null)
      }),
    )
  }

  getDocuments(id: string) {
    return this._http.get<any>(`/v1/actor/cleantechs/${id}/documentation`)
  }
  getAllCleantechData(): Observable<CleantechsUser[]> {
    return this._http.get<CleantechsUser[]>(`/v1/actor/cleantechs`)
  }

  deleteCleantechUser(id: string): Observable<any> {
    return this._http.delete<any>(`/v1/actor/cleantechs/${id}`)
  }
}
