import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component';

const routes: Routes = [
	{
		path: '',
		component: SmeFormAnalysisComponent,
		data: {
			breadcrumb: 'new_analysis',
			hidden: true,
		},
	},
	{
		path: ':id',
		component: SmeFormAnalysisComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SmeAnalysisFormRoutingModule {}
