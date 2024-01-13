import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProjectService,
  SmeAnalysisStoreService,
  SmeRequestResponse,
  SmeService,
  UserService,
} from '@goeko/store';
import { take, toArray } from 'rxjs';

@Component({
  selector: 'goeko-dashboard-sme',
  templateUrl: './dashboard-sme.component.html',
  styleUrls: ['./dashboard-sme.component.scss'],
})
export class DashboardSmeComponent implements OnInit {
  public companyDetail!: any;
  public projects!: Array<SmeRequestResponse>;
  constructor(
    private _userService: UserService,
    private _smeAnalyticsStore: SmeAnalysisStoreService,
    private _smeService: SmeService,
    private _projectService: ProjectService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.projects = new Array<SmeRequestResponse>();
    this._userService.companyDetail.subscribe((companyDetail) => {
      if (companyDetail) {
        this.companyDetail = companyDetail;
      }
    });
    this._getLastProjectName();
  }

  private _getLastProjectName() {
    this._projectService
      .getRecommendationsByProjectById(this.companyDetail.id)
      .pipe(take(3), toArray())
      .subscribe((projects: SmeRequestResponse[]) => {
        if (projects) {
          this.projects = projects;
        }
      });
  }

  goToProject(projects: SmeRequestResponse) {
    this._smeAnalyticsStore.setCurrentAnalysis(projects);
    this._router.navigate(['/sme-analysis/last-project', projects.id], {
      queryParams: {
        smeId: projects.id,
        isProject: true,
      },
    });
  }
}
