import { Component, OnInit, effect } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from '@goeko/business-ui'
import { ProjectService, SmeRequestResponse, UserService } from '@goeko/store'
import { MESSAGE_TYPE } from '@goeko/ui'
import { take, tap, toArray } from 'rxjs'
import { SmeAnalysisService } from '../../sme-analysis-form/sme-analysis.service'
import { DialogService } from '@goeko/ui'
import { DialogNewProjectComponent } from '@goeko/business-ui'

@Component({
  selector: 'goeko-dashboard-sme',
  templateUrl: './dashboard-sme.component.html',
  styleUrls: ['./dashboard-sme.component.scss'],
  providers: [MessageService, SmeAnalysisService],
})
export class DashboardSmeComponent implements OnInit {
  public userProfile = this._userService.userProfile
  public projects!: Array<SmeRequestResponse>
  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    private _router: Router,
    private _messageService: MessageService,
    public route: ActivatedRoute,
    private _dialogService: DialogService
  ) {
    effect(() => {
      if (this.userProfile().id) {
        this._getLastProjectName()
      }
    })
  }
  ngOnInit(): void {
    this.projects = new Array<SmeRequestResponse>()
  }

  private _getLastProjectName() {
    this._projectService
      .getRecommendationsByProjectById(this.userProfile().id)
      .pipe(take(3), toArray())
      .subscribe((projects: SmeRequestResponse[]) => {
        if (projects) {
          this.projects = projects
        }
      })
  }

  goToProject(projects: SmeRequestResponse) {
    this._router.navigate(['../sme-analysis/projects/project', this.userProfile().id], {
      relativeTo: this.route.parent,
      queryParams: {
        projectId: projects.id,
      },
    })
  }

  deleteProject(project: SmeRequestResponse) {
    this._messageService
      .deleteMessage(MESSAGE_TYPE.WARNING, project.name)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this._projectService.deleteProject(project.id).subscribe((data) => {
            this._getLastProjectName()
          })
        }
      })
  }

  openNewProjectDialog() {
    this._dialogService.open(DialogNewProjectComponent);
  }
}
