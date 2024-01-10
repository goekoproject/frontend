import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage.service';
import { SmeOptions } from './sme-options';
import { SME_CONFIGURATION } from './sme.module';
import {
  Observable,
  map,
  mergeMap,
  from,
  ObservableInput,
  filter,
  reduce,
} from 'rxjs';
import {
  SmeCreateRecomendationRequest,
  SmeRequestResponse,
  SmeSaveRecomendationRequest,
} from './sme-request.model';
//TODO: Change obj modal

@Injectable()
export class ProjectService {
  constructor(
    @Inject(SME_CONFIGURATION) public configuration: SmeOptions,
    private readonly sessionStorageService: SessionStorageService,

    private _http: HttpClient
  ) {}

  getProjectById(id: string): Observable<any> {
    return this._http.get<any>(`/v1/recommendation/projects/smes/${id}`);
  }

  createProject(body: SmeCreateRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v1/recommendation/projects/smes`, body);
  }

  saveProject(body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v1/recommendation/projects/smes`, body);
  }

  updateProject(
    id: string,
    body: SmeSaveRecomendationRequest
  ): Observable<any> {
    return this._http.put<any>(`/v1/recommendation/projects/smes/${id}`, body);
  }
  getLastProjectBySmeId(id: string): Observable<any> {
    return this.getProjectById(id).pipe(
      map(
        (recommendation: { projects: SmeRequestResponse[] }) =>
          recommendation.projects
      ),
      mergeMap((data: unknown) => from(data as ObservableInput<any>)), // Convierte el array en un Observable de elementos individuales
      reduce((maxItem: any, currentItem: any) =>
        new Date(currentItem.date) > new Date(maxItem.date)
          ? currentItem
          : maxItem
      )
    );
  }

  getRecommendationsByProjectById(id: string): Observable<any> {
    return this.getProjectById(id).pipe(
      map((recommendation) => recommendation.projects),
      mergeMap((data) => from(data)) // Convierte el array en un Observable de elementos individuale */
    );
  }
}
