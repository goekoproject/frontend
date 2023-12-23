import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSmeComponent } from './dashboard/dashboard-sme.component';
import { DashboardCleantechComponent } from './dashboard/dashboard-cleantech/dashboard-cleantech.component';

const routes: Routes = [
	{
		path: 'sme',
		component: DashboardSmeComponent,
		data: {
			breadcrumb: 'dashboard',
			hidden: true,
			onBack: false,
		},
	},
	{
		path: 'cleantech',
		component: DashboardCleantechComponent,
		data: {
			breadcrumb: 'dashboard',
			hidden: true,
			onBack: false,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
