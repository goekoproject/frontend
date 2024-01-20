import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Observable,
  ObservableInput,
  filter,
  from,
  map,
  mergeMap,
  reduce,
  toArray,
} from 'rxjs';
import { SessionStorageService } from '../session-storage.service';
import { SmeOptions } from './sme-options';
import {
  SmeCreateRecomendationRequest,
  SmeRecomendationRequestDemo,
  SmeRequestResponse,
  SmeSaveRecomendationRequest,
} from './sme-request.model';
import { SME_CONFIGURATION } from './sme.module';
import {
  Recommendation,
  ResponseRecommendations,
} from './ecosolution-recomendations.model';

@Injectable()
export class SmeService {
  constructor(
    @Inject(SME_CONFIGURATION) public configuration: SmeOptions,
    private readonly sessionStorageService: SessionStorageService,
    public _http: HttpClient
  ) {}

  /* 	getRecommendations(body: SmeRecomendationRequest): Observable<any> {
		return this._http.get<any>(`assets/data/recommendation-response.json`);
	} */

  getRecommendations(body: SmeRecomendationRequestDemo): Observable<any> {
    return this._http.post<any>(`/v1/demo/ecosolution/search`, body);
  }

  getRecommendationsById(id: string): Observable<any> {
    return this._http.get<any>(`v1/ecosolution/search/requests/${id}`);
  }

  getLastRecommendationById(id: string): Observable<any> {
    return this.getRecommendationsById(id).pipe(
      map((recommendation) => recommendation.requests),
      mergeMap((data) => from(data)), // Convierte el array en un Observable de elementos individuale
      reduce((maxItem: any, currentItem: any) =>
        new Date(currentItem.date) > new Date(maxItem.date)
          ? currentItem
          : maxItem
      )
    );
  }

  createRecommendations(
    body: SmeCreateRecomendationRequest
  ): Observable<Recommendation[]> {
    return this._http
      .post<any>(`/v1/recommendation/smes`, body)
      .pipe(
        map((request: ResponseRecommendations) => request?.recommendations)
      );
  }

  saveRecommendations(body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v1/recommendation/requests/smes`, body);
  }

  updateRecommendations(
    id: string,
    body: SmeSaveRecomendationRequest
  ): Observable<any> {
    return this._http.put<any>(`/v1/recommendation/requests/smes/${id}`, body);
  }

  getByIdExternal(id: string): Observable<any> {
    const _id = encodeURIComponent(id);
    const params = new HttpParams().set('id', _id);

    return this._http.get<any>(`/v1/actor/smes/external`, { params });
  }

  getById(id: string): Observable<any> {
    return this._http.get<any>(`/v1/actor/smes/` + id);
  }

  createDataProfile(body: any) {
    return this._http.post<any>(`/v1/actor/smes`, body);
  }
  updateDataProfile(id: any, body: any) {
    return this._http.put<any>(`/v1/actor/smes/${id}`, body);
  }
}
