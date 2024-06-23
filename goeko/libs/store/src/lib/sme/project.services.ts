import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Observable,
  ObservableInput,
  find,
  from,
  map,
  mergeMap,
  reduce
} from 'rxjs';
import { SessionStorageService } from '../session-storage.service';
import { SmeOptions } from './sme-options';
import {
  Projetcs,
  SmeCreateRecomendationRequest,
  SmeRequestResponse,
  SmeSaveRecomendationRequest,
} from './sme-request.model';

@Injectable()
export class ProjectService {
  constructor(
    private readonly sessionStorageService: SessionStorageService,

    private _http: HttpClient
  ) {}

  getProjects(id: string): Observable<Projetcs> {
    return this._http.get<Projetcs>(`/v1/ecosolution/search/projects/smes/${id}`);
  }

  createProject(body: SmeCreateRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v1/ecosolution/search/projects/smes`, body);
  }

  saveProject(body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v1/ecosolution/search/projects/smes`, body);
  }

  updateProject(
    id: string,
    body: SmeSaveRecomendationRequest
  ): Observable<any> {
    return this._http.put<any>(`/v1/ecosolution/search/projects/smes/${id}`, body);
  }
  getLastProjectBySmeId(id: string): Observable<SmeRequestResponse> {
    return this.getProjects(id).pipe(
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

  
  getProjectId({smeId='', projectId= ''}): Observable<SmeRequestResponse |undefined> {
    return this.getProjects(smeId).pipe(
      map((recommendation) => recommendation.projects),
      mergeMap((data) => from(data)), // Convierte el array en un Observable de elementos individuale
      find((project) => project.id === projectId), //
    );
  }

  getRecommendationsByProjectById(id: string): Observable<any> {
    return this.getProjects(id).pipe(
      map((recommendation) => recommendation.projects),
      mergeMap((data) => from(data)) // Convierte el array en un Observable de elementos individuale */
    );
  }

  deleteProject(id: string): Observable<any> {
    return this._http.delete<any>(`/v1/ecosolution/search/projects/smes/${id}`);

  }
}
