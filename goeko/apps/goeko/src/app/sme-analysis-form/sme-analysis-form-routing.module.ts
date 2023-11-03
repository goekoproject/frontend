import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component';
import { SmeAnalysisSummaryComponent } from './sme-form-analysis/sme-analysis-summary/sme-analysis-summary.component';
import { SmeAnalysisComponent } from './sme-analysis/sme-analysis.component';
import { SmeAnalysisResultComponent } from './sme-analysis-result/sme-analysis-result.component';

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
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SmeAnalysisFormRoutingModule {}
