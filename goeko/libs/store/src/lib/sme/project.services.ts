import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { CacheProperty } from '@goeko/coretools'
import { map, Observable } from 'rxjs'
import { ClassificationsService } from '../classificactions/classifications.service'
import { CategoryGrouping, GroupingType } from '../classificactions/public-api'
import { Project } from './project.interface'
import { SmeCreateRecomendationRequest, SmeRequestResponse, SmeSaveRecomendationRequest } from './sme-request.model'

@Injectable()
export class ProjectService {
  private _classificationsServices = inject(ClassificationsService)

  public projects = signal<Project[]>([])
  @CacheProperty('projectQuery')
  projectQuery!: Project

  setProjectQuery(project: Project) {
    this.projectQuery = project
  }
  constructor(private _http: HttpClient) {}

  getProjects(id: string) {
    this._http
      .get(`/v2/ecosolution/search/projects/smes/${id}`)
      .pipe(map((res: any) => res['projects']))
      .subscribe((projects) => {
        this.projects.set(projects)
      })
  }

  createProject(body: SmeCreateRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v2/ecosolution/search/projects/smes`, body)
  }

  saveProject(body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v2/ecosolution/search/projects/smes`, body)
  }

  updateProject(id: string, body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.put<any>(`/v2/ecosolution/search/projects/smes/${id}`, body)
  }

  getProjectId({ smeId = '', projectId = '' }): Observable<SmeRequestResponse | Project> {
    return this._http.get<SmeRequestResponse | Project>(`/v2/ecosolution/search/projects/smes/${smeId}/${projectId}`)
  }

  deleteProject(id: string): Observable<any> {
    return this._http.delete<any>(`/v2/ecosolution/search/projects/smes/${id}`)
  }
  getGroupingFormCategories(grouping = GroupingType.construction): Observable<CategoryGrouping[]> {
    return this._classificationsServices.groupingFormCategories(grouping)
  }
}
