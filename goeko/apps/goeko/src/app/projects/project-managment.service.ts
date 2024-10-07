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
} from '@goeko/store'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProjectManagmentService {
  private _ecosolutionsSearchService = inject(EcosolutionsSearchService)
  private _classificationsServices = inject(ClassificationsService)
  private _taggingServices = inject(EcosolutionsTaggingService)
  private _selectLocationsService = inject(SelectLocationsService)

  @CacheProperty('projectQuery')
  projectQuery!: Project

  public projects = this._ecosolutionsSearchService.projects
  public ecosolutionsSearch = this._ecosolutionsSearchService.ecosolutionsSearch

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
    this._selectLocationsService.selectedCodeLang.set(this.projectQuery.locations[0].country.code)
  }
  setProjectQuery(project: Project) {
    this.projectQuery = {
      ...project,
      locations: [
        {
          country: {
            code: 'CH',
            regions: ['CH-FR', 'CH-GE', 'CH-GR', 'CH-BS'],
          },
        },
      ],
    }
  }

  getEcosolutionsByProjects(body: EcosolutionSearchRequest) {
    this._ecosolutionsSearchService.ecosolutionSearch(body)
  }
  getProjects(id: string) {
    this._ecosolutionsSearchService.getSearchEcosolutionsByProjects(id)
  }

  createProject(body: any) {
    return this._ecosolutionsSearchService.createSearchProject(body)
  }

  updateProject(id: string, body: any) {
    return this._ecosolutionsSearchService.updateSearchProject(id, body)
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
