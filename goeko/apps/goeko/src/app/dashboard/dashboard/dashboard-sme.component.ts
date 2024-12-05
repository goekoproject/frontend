import { Component, effect, inject, input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DialogNewProjectComponent, MessageService } from '@goeko/business-ui'
import { EcosolutionsTaggingService, SmeRequestResponse, TAGGING } from '@goeko/store'
import { DialogService } from '@goeko/ui'
import { DashboardSmeService } from './dashboard-sme.service'

@Component({
  selector: 'goeko-dashboard-sme',
  templateUrl: './dashboard-sme.component.html',
  styleUrls: ['./dashboard-sme.component.scss'],
  providers: [MessageService, DashboardSmeService, EcosolutionsTaggingService],
  
})
export class DashboardSmeComponent {
  private _dashboardSmeService = inject(DashboardSmeService)
  private _router = inject(Router)
  public route = inject(ActivatedRoute)
  private _dialogService = inject(DialogService)

  public TAGGING = TAGGING
  public id = input<string>('')

  public summary = this._dashboardSmeService.summary
  public ecosolutionFavourites = this._dashboardSmeService.ecosolutionFavourites
  constructor() {
    effect(() => {
      if (this.id()) {
        this._dashboardSmeService.getDashboardData(this.id())
        this._dashboardSmeService.getEcosolutionFavourites(this.id())
      }
    })
  }
  openNewProjectDialog() {
    this._dialogService
      .open(DialogNewProjectComponent)
      .afterClosed()
      .subscribe((newProject) => {
        this._goToProject(newProject)
      })
  }
  private _goToProject(projects: SmeRequestResponse) {
    this._router.navigate(['../project-form', this.id(), projects.id], {
      relativeTo: this.route.parent,
    })
  }
  showMore(ecosolutionId: string) {
    this._router.navigate([`platform/ecosolutions-detail/${this.id()}/${ecosolutionId}`])
  }
}
