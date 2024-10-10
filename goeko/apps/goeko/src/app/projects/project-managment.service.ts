import { computed, inject, Injectable } from '@angular/core'
import { SelectLocationsService } from '@goeko/business-ui'
import { CacheProperty } from '@goeko/coretools'
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
  private _selectLocationsService = inject(SelectLocationsService)
  private _userServices = inject(UserService)
  @CacheProperty('projectQuery')
  projectQuery!: Project

  public projects = this._ecosolutionsSearchService.projects
  public ecosolutionsSearch = this._ecosolutionsSearchService.ecosolutionsSearch
  public userProfle = this._userServices.userProfile()

  public country = computed(() =>
    this._selectLocationsService.countries()?.find((country) => country.code === this.projectQuery.locations[0].country.code),
  )
  public regions = computed(() =>
    this._selectLocationsService
      .regions()
      ?.filter((region) => this.projectQuery.locations[0].country.regions?.includes(region.code))
      .map((region) => region.label)
      .toString(),
  )

  constructor() {
    if (this.projectQuery.locations) {
      this._selectLocationsService.selectedCodeLang.set(this.projectQuery.locations[0].country.code)
    }
  }
  setProjectQuery(project: Project) {
    this.projectQuery = project
  }

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
    return this.getProjectId({ smeId: this.userProfle.id, projectId: this.projectQuery.id }).pipe(
      switchMap((project: Project) => {
        project.notification.onNewEcosolution = onNotification
        return this.updateProject(this.projectQuery.id, project)
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
}
