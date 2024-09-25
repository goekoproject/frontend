import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { EcosolutionsService, ProjectService, SmeUser, TAGGING, UserService } from '@goeko/store'
import { CardProductComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { CriteriaEcosolutionSearch } from '../../sme-analysis-form/sme-analysis-result/ecosolution-list/criteria-ecosolution-search.model'
import { ProjectEcosolutionsFiltersComponent } from '../project-ecosolutions-filters.component'
@Component({
  selector: 'goeko-project-ecosolution-catalog',
  standalone: true,
  imports: [CommonModule, CardProductComponent, TranslateModule, ProjectEcosolutionsFiltersComponent],
  providers: [EcosolutionsService],
  templateUrl: './project-ecosolutions-catalog.component.html',
  styleUrl: './project-ecosolutions-catalog.component.scss',
})
export class ProjectEcosolutionCatalogComponent {
  private _projectService = inject(ProjectService)
  private _ecosolutionServices = inject(EcosolutionsService)
  private _userService = inject(UserService)

  public TAGGING = TAGGING
  public projectData = signal(this._projectService.projectQuery)
  public queryEcosolutions = signal(new CriteriaEcosolutionSearch(this.projectData(), this._userService.userProfile() as SmeUser))
  public ecosolutionsListForProject = toSignal(this._ecosolutionServices.ecosolutionSearch(this.queryEcosolutions()))

  public showFilter = signal<boolean>(true)
  toogleFilters = () => {
    this.showFilter.update((value) => !value)
  }
}
