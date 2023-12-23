import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component';
import { SmeAnalysisSummaryComponent } from './sme-analysis-summary/sme-analysis-summary.component';
import { SmeAnalysisComponent } from './sme-analysis/sme-analysis.component';
import { SmeAnalysisResultComponent } from './sme-analysis-result/sme-analysis-result.component';
import { SmeFormProjectComponent } from './sme-form-project/sme-form-project.component';
import { ResultDetailEcosolutionComponent } from './sme-analysis-result/result-detail-ecosolution/result-detail-ecosolution.component';
import { EcosolutionListComponent } from './sme-analysis-result/ecosolution-list/ecosolution-list.component';

const routes: Routes = [
	{
		path: 'new',
		component: SmeAnalysisComponent,
		data: {
			breadcrumb: 'new_analysis',
			hidden: true,
		},
		children: [
			{
				path: '',
				component: SmeFormAnalysisComponent,
			},
			{
				path: 'summary',
				component: SmeAnalysisSummaryComponent,
				data: {
					breadcrumb: 'summary',
				},
			},
			/* {
				path: 'results/:id',
				component: SmeAnalysisResultComponent,
				data: {
					breadcrumb: 'your_ecosolutions',
				},
			}, */
		],
	},
	{
		path: 'last/:id',
		component: SmeAnalysisComponent,
		data: {
			breadcrumb: 'last_analysis',
			hidden: true,
		},
		children: [
			{
				path: '',
				component: SmeFormAnalysisComponent,
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
			},
		],
	},
	{
		path: 'new-project',
		component: SmeAnalysisComponent,
		data: {
			breadcrumb: 'new_project',
			hidden: true,
		},
		children: [
			{
				path: '',
				component: SmeFormProjectComponent,
			},
			{
				path: 'summary',
				component: SmeAnalysisSummaryComponent,
				data: {
					breadcrumb: 'summary',
				},
			},
		],
	},
	{
		path: 'last-project/:id',
		component: SmeAnalysisComponent,
		data: {
			breadcrumb: 'last_project',
			hidden: true,
		},
		children: [
			{
				path: '',
				component: SmeFormProjectComponent,
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
			},
		],
	},
	{
		path: 'results/:id',
		component: SmeAnalysisResultComponent,
		data: {
			breadcrumb: 'your_ecosolutions',
		},
		children: [
			{ path: '', component: EcosolutionListComponent },
			{ path: 'details', component: ResultDetailEcosolutionComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SmeAnalysisFormRoutingModule {}
