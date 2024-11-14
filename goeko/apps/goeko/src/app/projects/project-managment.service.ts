import { computed, inject, Injectable, signal } from '@angular/core'
import {
  Category,
  ClassificationsService,
  EcosolutionSearchRequest,
  EcosolutionsSearchService,
  EcosolutionsTaggingService,
  Project,
  UserService,
} from '@goeko/store'
import { Observable, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProjectManagmentService {
  private _ecosolutionsSearchService = inject(EcosolutionsSearchService)
  private _classificationsServices = inject(ClassificationsService)
  private _taggingServices = inject(EcosolutionsTaggingService)
  private _userServices = inject(UserService)
  private userProfle = this._userServices.userProfile()
  private _smeId = computed(() => this._userServices.userProfile().id)

  public projects = this._ecosolutionsSearchService.projects
  public ecosolutionsSearch = this._ecosolutionsSearchService.ecosolutionsSearch
  public project = signal<Project>({} as Project)

  getEcosolutionsByProjects(body: EcosolutionSearchRequest) {
    this._ecosolutionsSearchService.ecosolutionSearch(body)
  }
  getProjects(id: string) {
    this._ecosolutionsSearchService.getSearchEcosolutionsByProjects(id)
  }
  getProjectId({ smeId = '', projectId = '' }): Observable<Project> {
    return this._ecosolutionsSearchService.getSearchProjectId({ smeId, projectId }) as any
  }

  createProject(body: any) {
    return this._ecosolutionsSearchService.createSearchProject(body)
  }

  updateProject(id: string, body: any) {
    return this._ecosolutionsSearchService.updateSearchProject(id, body)
  }
  turnOnNotification(onNotification: boolean) {
    return this.getProjectId({ smeId: this.userProfle.id, projectId: this.project().id }).pipe(
      switchMap((project: Project) => {
        project.notification.onNewEcosolution = onNotification
        return this.updateProject(this.project().id, project)
      }),
    )
  }
  deleteProject(id: string) {
    return this._ecosolutionsSearchService.deleteSearchProjectById(id)
  }
  getGroupingFormCategories(grouping: string = 'construction'): Observable<Category[]> {
    return this._classificationsServices.groupingFormCategories(grouping)
  }
  toogleFavourite(smeId: string, ecosolution: any) {
    const isFavourite = ecosolution.favourite
    if (isFavourite) {
      return this._taggingServices.removeFavorite(smeId, ecosolution.id)
    }
    return this._taggingServices.addFavorite(smeId, ecosolution.id)
  }

  getAllDataCategories() {
    return this._classificationsServices.getAllDataCategories()
  }
}
