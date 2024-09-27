import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, Signal, signal, viewChild } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SelectLocationsService } from '@goeko/business-ui'
import { Category, EcosolutionResult, EcosolutionsService, ProjectService, SmeUser, TAGGING, UserService } from '@goeko/store'
import { CardProductComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { CriteriaEcosolutionSearch } from '../../sme-analysis-form/sme-analysis-result/ecosolution-list/criteria-ecosolution-search.model'
import { ProjectEcosolutionsFiltersComponent } from '../project-ecosolutions-filters.component'
@Component({
  selector: 'goeko-project-ecosolution-catalog',
  standalone: true,
  imports: [CommonModule, CardProductComponent, UiSuperSelectModule, TranslateModule, ProjectEcosolutionsFiltersComponent],
  providers: [EcosolutionsService, SelectLocationsService],
  templateUrl: './project-ecosolutions-catalog.component.html',
  styleUrl: './project-ecosolutions-catalog.component.scss',
})
export class ProjectEcosolutionCatalogComponent {
  filtersRef: Signal<ProjectEcosolutionsFiltersComponent> = viewChild.required(ProjectEcosolutionsFiltersComponent)
  compareWithCountry = (o1: any, o2: any) => {
    console.log(o2)
    return o1 === o2
  }
  private _projectService = inject(ProjectService)
  private _ecosolutionServices = inject(EcosolutionsService)
  private _userService = inject(UserService)
  private _selectLocationsService = inject(SelectLocationsService)

  public country = computed(() =>
    this._selectLocationsService.countries()?.find((country) => country.code === this.projectData().locations[0].country.code),
  )
  public regions = computed(() =>
    this._selectLocationsService
      .regions()
      ?.filter((region) => this.projectData().locations[0].country.regions?.includes(region.code))
      .map((region) => region.label)
      .toString(),
  )
  public totalEcosolutions = computed(() => this.ecosolutionsListForProject()?.length)
  public TAGGING = TAGGING
  public projectData = signal(this._projectService.projectQuery)
  public queryEcosolutions = signal(new CriteriaEcosolutionSearch(this.projectData(), this._userService.userProfile() as SmeUser))
  private _ecosolutionsSearchSignal = toSignal(this._ecosolutionServices.ecosolutionSearch(this.queryEcosolutions()))

  public ecosolutionsListForProject = computed(() => this.applyFilters())

  public showFilter = signal<boolean>(true)
  public appliedCategoryFilters = signal<Category[] | null>(null)
  public appliedSdgFilters = signal<number[] | null>(null)
  constructor() {
    this._selectLocationsService.selectedCodeLang.set(this.projectData().locations[0].country.code)
    effect(() => {
      this.filtersRef().onApplyFilters.subscribe((filters) => {
        this.appliedCategoryFilters.set(filters.categories)
        this.appliedSdgFilters.set(filters.sdg)
      })
    })
  }
  toogleFilters = () => {
    this.showFilter.update((value) => !value)
  }
  removeFilterCategory(code: string) {
    this.appliedCategoryFilters.update((filters) => (filters ?? []).filter((category) => category.code !== code))
  }

  applyFilters = () => {
    return this._ecosolutionsSearchSignal()?.filter((ecosolution) => {
      return this._filterByCategory(ecosolution) && this._filterBySdg(ecosolution)
    })
  }

  private _filterByCategory = (ecosolution: EcosolutionResult) => {
    if (this.appliedCategoryFilters() === null || this.appliedCategoryFilters()?.length === 0) {
      return true
    }
    return this.appliedCategoryFilters()
      ?.map((category) => category.code)
      .includes(ecosolution.classification.mainCategory)
  }

  private _filterBySdg = (ecosolution: EcosolutionResult) => {
    if (this.appliedSdgFilters() === null || this.appliedCategoryFilters()?.length === 0) {
      return true
    }
    return this.appliedSdgFilters()?.some((sdg) => ecosolution.sustainableDevelopmentGoals.includes(sdg))
  }
}
