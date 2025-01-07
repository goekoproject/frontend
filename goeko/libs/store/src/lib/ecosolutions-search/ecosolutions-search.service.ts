import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { map, Observable, shareReplay } from 'rxjs'
import { EcosolutionResult } from '../ecosolutions/ecosolution-result.interface'
import { EcosolutionSearchRequest } from '../ecosolutions/ecosolution-search.request.model'
import { EcosolutionSearchResponse } from '../ecosolutions/ecosolution-search.response.interface'
import { Project } from '../sme/project.interface'
import { SmeSaveRecomendationRequest } from '../sme/sme-request.model'
import { TranslateChangeService } from '../util/translate-change'

@Injectable({
  providedIn: 'root',
})
export class EcosolutionsSearchService extends TranslateChangeService {
  private _http = inject(HttpClient)
  public projects = signal<Project[]>([])
  public ecosolutionsSearch = signal<EcosolutionResult[]>([])
  constructor() {
    super()
    this.changeLang()
  }

  getSearchEcosolutionsByProjects(id: string) {
    this._http
      .get<{ projects: Project[] }>(`/v2/ecosolution/search/projects/smes/${id}?lang=${this.lang()}`)
      .pipe(map((res) => res.projects))
      .subscribe((projects) => {
        this.projects.set(projects)
      })
  }

  getSearchProjectId({ smeId = '', projectId = '' }): Observable<Project> {
    return this._http.get<Project>(`/v2/ecosolution/search/projects/smes/${smeId}/${projectId}`)
  }

  createSearchProject(body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.post<any>(`/v2/ecosolution/search/projects/smes`, body)
  }

  updateSearchProject(id: string, body: SmeSaveRecomendationRequest): Observable<any> {
    return this._http.put<any>(`/v2/ecosolution/search/projects/smes/${id}`, body)
  }

  getSearchProjectById({ smeId = '', projectId = '' }): Observable<Project> {
    return this._http.get<Project>(`/v2/ecosolution/search/projects/smes/${smeId}/${projectId}`)
  }

  deleteSearchProjectById(id: string): Observable<any> {
    return this._http.delete<any>(`/v2/ecosolution/search/projects/smes/${id}`)
  }

  ecosolutionSearch(body: EcosolutionSearchRequest) {
    this._http
      .post<{ ecosolutions: EcosolutionResult[] }>(`/v1/ecosolution/search?lang=${this.lang()}`, body)
      .pipe(
        map((request: { ecosolutions: EcosolutionResult[] }) => request.ecosolutions),
        shareReplay(1),
      )
      .subscribe((ecosolutiosn) => this.ecosolutionsSearch.set(ecosolutiosn))
  }

  getEcosolutionSearchById(id: string, smeId: string): Observable<EcosolutionSearchResponse> {
    const params = {
      lang: this.lang(),
      smeId,
    }

    return this._http.get<EcosolutionSearchResponse>(`/v1/ecosolution/search/detail/${id}`, { params })
  }
}
