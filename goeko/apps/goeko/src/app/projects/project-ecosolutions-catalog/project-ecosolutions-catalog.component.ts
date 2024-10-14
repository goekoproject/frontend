import { CommonModule } from '@angular/common'
import { Component, computed, inject, input, OnInit, Signal, signal, viewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectLocationsService } from '@goeko/business-ui'
import { EcosolutionResult, EcosolutionsService, EcosolutionsTaggingService, Project, TAGGING } from '@goeko/store'
import { ButtonModule, CardProductComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { ProjectEcosolutionsFiltersComponent } from '../project-ecosolutions-filters.component'
import { ProjectEcosolutionsQuery } from '../project-ecosolutions-query.model'
import { ProjectManagmentService } from '../project-managment.service'
@Component({
  selector: 'goeko-project-ecosolution-catalog',
  standalone: true,
  imports: [CommonModule, CardProductComponent, UiSuperSelectModule, TranslateModule, ProjectEcosolutionsFiltersComponent, ButtonModule],
  providers: [EcosolutionsService, SelectLocationsService, ProjectManagmentService, EcosolutionsTaggingService],
  templateUrl: './project-ecosolutions-catalog.component.html',
  styleUrl: './project-ecosolutions-catalog.component.scss',
})
export class ProjectEcosolutionCatalogComponent implements OnInit {
  private _projectManagmentService = inject(ProjectManagmentService)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  public isLoading = signal(false)

  public filtersRef: Signal<ProjectEcosolutionsFiltersComponent> = viewChild.required(ProjectEcosolutionsFiltersComponent)
  public smeId = input<string>('')
  public project = input<Project>({} as Project)
  public country = computed(() => (this.project()?.locations ? this.project()?.locations[0]?.country.label : ''))
  public regions = computed(() =>
    this.project()?.locations
      ? this.project()
          ?.locations[0]?.country?.regions?.map((region) => region.label)
          .join(', ')
      : '',
  )
  public totalEcosolutions = computed(() => this.ecosolutionsListForProject()?.length)
  public TAGGING = TAGGING

  public queryEcosolutions = signal<ProjectEcosolutionsQuery>({} as ProjectEcosolutionsQuery)
  private _ecosolutionsSearchSignal = this._projectManagmentService.ecosolutionsSearch

  public ecosolutionsListForProject = computed(() => this._applyFilters())

  public showFilter = signal<boolean>(true)

  ngOnInit(): void {
    const projectEcosolutionQuery = new ProjectEcosolutionsQuery(this.project(), this.smeId())
    this.queryEcosolutions.set(projectEcosolutionQuery)
    this._projectManagmentService.project.set(this.project())
    this.fetchEcosolutionsCatalog()
  }
  toogleFilters = () => {
    this.showFilter.update((value) => !value)
  }

  fetchEcosolutionsCatalog = () => {
    this.isLoading.set(true)
    this._projectManagmentService.getEcosolutionsByProjects(this.queryEcosolutions())
    setTimeout(() => {
      this.isLoading.set(false)
    }, 1000)
  }

  toogleFavourite = (ecosolution: EcosolutionResult) => {
    this._projectManagmentService.toogleFavourite(this.smeId(), ecosolution).subscribe((response) => {
      if (response) {
        this.fetchEcosolutionsCatalog()
      }
    })
  }

  viewEcosolutionDetail = (ecosolution: EcosolutionResult) => {
    this._router.navigate(['ecosolutions-detail', this.smeId(), ecosolution.id], {
      relativeTo: this._route.parent,
    })
  }
  turnOnNotification = () => {
    this._projectManagmentService.turnOnNotification(true).subscribe((response) => {
      if (response) {
        this._router.navigate(['/projects-list', this.smeId()])
      }
    })
  }

  private _applyFilters = () => {
    return this._ecosolutionsSearchSignal()?.filter((ecosolution) => {
      return this._filterByCategory(ecosolution) && this._filterBySdg(ecosolution) && this._getFavoriteEcosolutions(ecosolution)
    })
  }

  private _filterByCategory = (ecosolution: EcosolutionResult) => {
    const appliedCategoryFilters = this.filtersRef()?.filterCategories()
    if (appliedCategoryFilters === null || appliedCategoryFilters?.length === 0) {
      return true
    }
    return appliedCategoryFilters?.map((category) => category.code).includes(ecosolution.classification.mainCategory)
  }
  private _filterBySdg = (ecosolution: EcosolutionResult) => {
    const appliedSdgFilters = this.filtersRef()?.filterSdg()
    if (appliedSdgFilters === null || appliedSdgFilters?.length === 0) {
      return true
    }
    return appliedSdgFilters?.some((sdg) => ecosolution.sustainableDevelopmentGoals.includes(sdg.code))
  }
  private _getFavoriteEcosolutions = (ecosolution: EcosolutionResult) => {
    return this.filtersRef()?.checkFavourite() ? ecosolution.favourite : ecosolution
  }
}
