import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { from, map, mergeMap, Observable, ObservableInput, reduce } from 'rxjs'
import { Category } from '../classificactions/classifications.interface'
import { ClassificationsService } from '../classificactions/classifications.service'
import { Project } from './project.interface'
import { Projects, SmeCreateRecomendationRequest, SmeRequestResponse, SmeSaveRecomendationRequest } from './sme-request.model'

@Injectable()
export class ProjectService {
  private _classificationsServices = inject(ClassificationsService)
  constructor(private _http: HttpClient) {}

  getProject(id: string): Observable<Projects> {
    return this._http.get<Projects>(`/v1/ecosolution/search/projects/smes/${id}`)
  }

  createProject(body: SmeCreateRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v1/ecosolution/search/projects/smes`, body)
  }

  saveProject(body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v1/ecosolution/search/projects/smes`, body)
  }

  updateProject(id: string, body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.put<any>(`/v1/ecosolution/search/projects/smes/${id}`, body)
  }
  getLastProjectBySmeId(id: string): Observable<SmeRequestResponse> {
    return this.getProject(id).pipe(
      map((recommendation: { projects: SmeRequestResponse[] }) => recommendation.projects),
      mergeMap((data: unknown) => from(data as ObservableInput<any>)), // Convierte el array en un Observable de elementos individuales
      reduce((maxItem: any, currentItem: any) => (new Date(currentItem.date) > new Date(maxItem.date) ? currentItem : maxItem)),
    )
  }

  getProjectId({ smeId = '', projectId = '' }): Observable<SmeRequestResponse | Project> {
    return this._http.get<SmeRequestResponse | Project>(`/v1/ecosolution/search/projects/smes/${smeId}/${projectId}`)
  }

  getRecommendationsByProjectById(id: string): Observable<any> {
    return this.getProject(id).pipe(
      map((recommendation) => recommendation.projects),
      mergeMap((data) => from(data)), // Convierte el array en un Observable de elementos individuale */
    )
  }

  deleteProject(id: string): Observable<any> {
    return this._http.delete<any>(`/v1/ecosolution/search/projects/smes/${id}`)
  }

  getGroupingFormCategories(grouping: string = 'construction'): Observable<Category[]> {
    return this._classificationsServices.groupingFormCategories(grouping)
  }
}
