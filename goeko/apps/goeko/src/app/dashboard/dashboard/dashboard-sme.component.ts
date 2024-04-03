import { Component, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '@goeko/business-ui';
import {
  ProjectService,
  SmeAnalysisStoreService,
  SmeRequestResponse,
  UserService,
} from '@goeko/store';
import { MESSAGE_TYPE } from '@goeko/ui';
import { take, toArray } from 'rxjs';

@Component({
  selector: 'goeko-dashboard-sme',
  templateUrl: './dashboard-sme.component.html',
  styleUrls: ['./dashboard-sme.component.scss'],
  providers: [MessageService],
})
export class DashboardSmeComponent implements OnInit {
  public userProfile = this._userService.userProfile;
  public projects!: Array<SmeRequestResponse>;
  constructor(
    private _userService: UserService,
    private _smeAnalyticsStore: SmeAnalysisStoreService,
    private _projectService: ProjectService,
    private _router: Router,
    private _messageService: MessageService
  ) {
    effect(() => {
      if (this.userProfile().id) {
        this._getLastProjectName();
      }
    });
  }
  ngOnInit(): void {
    this.projects = new Array<SmeRequestResponse>();
  }

  private _getLastProjectName() {
    this._projectService
      .getRecommendationsByProjectById(this.userProfile().id)
      .pipe(take(3), toArray())
      .subscribe((projects: SmeRequestResponse[]) => {
        if (projects) {
          this.projects = projects;
        }
      });
  }

  goToProject(projects: SmeRequestResponse) {
    this._smeAnalyticsStore.setCurrentAnalysis(projects);
    this._router.navigate(['/sme-analysis/last-project',this.userProfile().id], {
      queryParams: {
        projectId: projects.id
      },
    });
  }

  deleteProject(project: SmeRequestResponse) {
    this._messageService
      .showMessage(MESSAGE_TYPE.WARNING, project.name)
      .subscribe((res) => {
        if (res) {
          this._projectService.deleteProject(project.id).subscribe((data) => {
            this._getLastProjectName();
          });
        }
      });
  }
}
