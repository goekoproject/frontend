import { Component, effect } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DialogNewProjectComponent, MessageService } from '@goeko/business-ui'
import { SmeRequestResponse, UserService } from '@goeko/store'
import { DialogService } from '@goeko/ui'
import { SmeAnalysisService } from '../../sme-analysis-form/sme-analysis.service'

@Component({
  selector: 'goeko-dashboard-sme',
  templateUrl: './dashboard-sme.component.html',
  styleUrls: ['./dashboard-sme.component.scss'],
  providers: [MessageService, SmeAnalysisService],
})
export class DashboardSmeComponent {
  public userProfile = this._userService.userProfile
  constructor(
    private _userService: UserService,
    private _router: Router,
    public route: ActivatedRoute,
    private _dialogService: DialogService,
  ) {
    effect(() => {})
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
    this._router.navigate(['../project-form', this.userProfile().id, projects.id], {
      relativeTo: this.route.parent,
      queryParams: {
        projectId: projects.id,
      },
    })
  }
}
