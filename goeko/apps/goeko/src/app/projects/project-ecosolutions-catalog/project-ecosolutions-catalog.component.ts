import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { CacheSignal } from '@goeko/core'
import { EcosolutionsService, ProjectService, SmeUser, TAGGING, UserService } from '@goeko/store'
import { CardProductComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { CriteriaEcosolutionSearch } from '../../sme-analysis-form/sme-analysis-result/ecosolution-list/criteria-ecosolution-search.model'

@Component({
  selector: 'goeko-project-ecosolution-catalog',
  standalone: true,
  imports: [CommonModule, CardProductComponent, TranslateModule],
  providers: [EcosolutionsService],
  templateUrl: './project-ecosolutions-catalog.component.html',
  styleUrl: './project-ecosolutions-catalog.component.scss',
})
export class ProjectEcosolutionCatalogComponent {
  private _projectService = inject(ProjectService)
  private _ecosolutionServices = inject(EcosolutionsService)
  private _userService = inject(UserService)

  public TAGGING = TAGGING
  public queryEcosolutions = signal(
    new CriteriaEcosolutionSearch(this._projectService.projectQuery, this._userService.userProfile() as SmeUser),
  )
  public ecosolutionsListForProject = toSignal(this._ecosolutionServices.ecosolutionSearch(this.queryEcosolutions()))
}
