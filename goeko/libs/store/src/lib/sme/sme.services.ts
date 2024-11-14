import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, find, from, map, mergeMap, reduce } from 'rxjs'
import { EcosolutionResult } from '../ecosolutions/ecosolution-result.interface'
import { EcosolutionSearchRequest } from '../ecosolutions/ecosolution-search.request.model'
import { EcosolutionSearchResponse } from '../ecosolutions/ecosolution-search.response.interface'
import { EcosolutionsService } from '../ecosolutions/ecosolutions.service'
import { SmeUser } from '../user/public-api'
import { TranslateChangeService } from '../util/translate-change'
import { SmeDashboard } from './sme-dashboard.interface'
import { Requests, SmeRequestResponse, SmeSaveRecomendationRequest } from './sme-request.model'

@Injectable()
export class SmeService extends TranslateChangeService {
  constructor(
    private readonly _ecosolutionServices: EcosolutionsService,
    public _http: HttpClient,
  ) {
    super()
    this.changeLang()
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

  ecosolutionSearch(body: EcosolutionSearchRequest): Observable<EcosolutionResult[] | null> {
    return this._ecosolutionServices.ecosolutionSearch(body)
  }

  ecosolutionSearchById(id: string, smeId: string): Observable<EcosolutionSearchResponse> {
    return this._ecosolutionServices.getEcosolutionSearchById(id, smeId)
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

  getAllSmesData(): Observable<SmeUser[]> {
    return this._http.get<SmeUser[]>(`/v1/actor/smes`)
  }

  deleteSmeUser(id: string): Observable<any> {
    return this._http.delete<any>(`/v1/actor/smes/${id}`)
  }
  getDashboardData(id: string): Observable<SmeDashboard> {
    return this._http.get<SmeDashboard>(`/v1/actor/smes/${id}/dashboard`)
  }
}
