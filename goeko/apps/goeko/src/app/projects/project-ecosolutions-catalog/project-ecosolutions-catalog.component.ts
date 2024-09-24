import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { EcosolutionsService, ProjectService, SmeUser, UserService } from '@goeko/store'
import { CriteriaEcosolutionSearch } from '../../sme-analysis-form/sme-analysis-result/ecosolution-list/criteria-ecosolution-search.model'

@Component({
  selector: 'goeko-project-ecosolution-catalog',
  standalone: true,
  imports: [CommonModule],
  providers: [EcosolutionsService],
  templateUrl: './project-ecosolutions-catalog.component.html',
  styleUrl: './project-ecosolutions-catalog.component.scss',
})
export class ProjectEcosolutionCatalogComponent {
  private _projectService = inject(ProjectService)
  private _ecosolutionServices = inject(EcosolutionsService)
  private _userService = inject(UserService)

  public queryEcosolutions = this._projectService.projectQuery
  public ecosolutionsListForProject = toSignal(
    this._ecosolutionServices.ecosolutionSearch(
      new CriteriaEcosolutionSearch(this.queryEcosolutions(), this._userService.userProfile() as SmeUser),
    ),
  )
}
