import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { unSavedChangesGuard } from '@goeko/business-ui';
import { SmeRequestAnalisysComponent } from './sme-analysis-request/sme-analysis-request.component';
import { EcosolutionListComponent } from './sme-analysis-result/ecosolution-list/ecosolution-list.component';
import { ResultDetailEcosolutionComponent } from './sme-analysis-result/result-detail-ecosolution/result-detail-ecosolution.component';
import { SmeAnalysisResultComponent } from './sme-analysis-result/sme-analysis-result.component';
import { SmeAnalysisSummaryComponent } from './sme-analysis-summary/sme-analysis-summary.component';
import { SmeAnalysisComponent } from './sme-analysis/sme-analysis.component';
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component';
import { SmeFormProjectComponent } from './sme-form-project/sme-form-project.component';

const routes: Routes = [
  {
    path: '',
    component: SmeAnalysisComponent,
    data: {
      breadcrumb: 'analysis',
      hidden: true,
    },
    children: [
      {
        path: 'list/:id',
        component: SmeRequestAnalisysComponent,
        data: {
          breadcrumb: 'analysis',
        },
      },
      {
        path: 'request',
        component: SmeFormAnalysisComponent,
      },
      {
        path: 'last/:id',
        component: SmeFormAnalysisComponent,
        canDeactivate: [unSavedChangesGuard],
        data: {
          breadcrumb: 'last_analysis',
        },
      },
      {
        path: 'new',
        component: SmeFormAnalysisComponent,
        canDeactivate: [unSavedChangesGuard],
        data: {
          breadcrumb: 'new_analysis',
        },
      },
      {
        path: 'summary',
        component: SmeAnalysisSummaryComponent,
        canDeactivate: [unSavedChangesGuard],
        data: {
          breadcrumb: 'summary',
        },
      },
      {
        path: 'results/:id',
        component: SmeAnalysisResultComponent,
        data: {
          breadcrumb: 'your_ecosolutions',
        },
        children: [
          { path: '', component: EcosolutionListComponent },
          {
            path: 'details/:idEcosolution',
            component: ResultDetailEcosolutionComponent,
          },
        ],
      },
    ],
  },

  {
    path: 'projects',
    component: SmeAnalysisComponent,
    data: {
      breadcrumb: 'new_project',
    },
    children: [
      {
        path: 'new',
        component: SmeFormProjectComponent,
      },
      {
        path: 'project/:id',
        component: SmeFormProjectComponent,
        data: {
          breadcrumb: 'last_project',
          hidden: true,
        },
      },
      {
        path: 'summary',
        component: SmeAnalysisSummaryComponent,
        data: {
          breadcrumb: 'summary',
        },
      },
      {
        path: 'results/:id',
        component: SmeAnalysisResultComponent,
        data: {
          breadcrumb: 'your_ecosolutions',
        },
        children: [
          { path: '', component: EcosolutionListComponent },
          {
            path: 'details/:idEcosolution',
            component: ResultDetailEcosolutionComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmeAnalysisFormRoutingModule {}
