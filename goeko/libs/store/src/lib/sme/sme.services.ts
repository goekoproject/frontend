import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, find, from, map, mergeMap, of, reduce } from 'rxjs'
import { SessionStorageService } from '../session-storage.service'
import { TranslateChangeService } from '../util/translate-change'
import { Recommendation, ResponseRecommendations } from './ecosolution-recomendations.model'
import {
  Requests,
  SmeCreateRecomendationRequest,
  SmeRecomendationRequestDemo,
  SmeRequestResponse,
  SmeSaveRecomendationRequest,
} from './sme-request.model'

@Injectable()
export class SmeService extends TranslateChangeService {
  constructor(
    private readonly sessionStorageService: SessionStorageService,
    public _http: HttpClient,
  ) {
    super()
    this.changeLang()
  }

  getRecommendations(body: SmeRecomendationRequestDemo): Observable<any> {
    return this._http.post<any>(`/v1/demo/ecosolution/search`, body)
  }

  getRequests(id: string): Observable<Requests> {
    return this._http.get<Requests>(`/v1/ecosolution/search/requests/smes/${id}`)
  }

  getAnalysisRequest(id: string): Observable<SmeRequestResponse[]> {
    return this.getRequests(id).pipe(map((recommendation) => recommendation.requests))
  }

  getRequestById({ smeId = '', requestId = '' }): Observable<SmeRequestResponse | undefined> {
    return this.getRequests(smeId).pipe(
      map((recommendation) => recommendation.requests),
      mergeMap((data) => from(data)), // Convierte el array en un Observable de elementos individuale
      find((request) => request.id === requestId), //
    )
  }

  getLastRecommendationById(id: string): Observable<SmeRequestResponse> {
    return this.getRequests(id).pipe(
      map((recommendation) => recommendation.requests),
      mergeMap((data) => from(data)), // Convierte el array en un Observable de elementos individuale
      reduce((maxItem: any, currentItem: any) => (new Date(currentItem.date) > new Date(maxItem.date) ? currentItem : maxItem)),
    )
  }

  ecosolutionSearch(body: SmeCreateRecomendationRequest): Observable<Recommendation[] | null> {
    if (!body || body.classifications.length <= 0) {
      return of(null)
    }
    return this._http
      .post<any>(`/v1/ecosolution/search?lang=${this.lang()}`, body)
      .pipe(map((request: ResponseRecommendations) => request?.ecosolutions))
  }

  saveRecommendations(body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v1/ecosolution/search/requests/smes`, body)
  }

  updateRecommendations(id: string, body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.put<any>(`/v1/ecosolution/search/requests/smes/${id}`, body)
  }

  deleteRequests(id: string): Observable<any> {
    return this._http.delete<Requests>(`/v1/ecosolution/search/requests/smes/${id}`)
  }

  getEcosolutionsById(id: string): Observable<Recommendation> {
    return this._http.get<Recommendation>(`/v1/ecosolutions/${id}`)
  }

  getAllSmesData(): Observable<any> {
    return this._http.get<any>(`/v1/actor/smes`)
  }

  //delete sme user
}
