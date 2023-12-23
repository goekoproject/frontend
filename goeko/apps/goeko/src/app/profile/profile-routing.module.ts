import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{
		path: ':externalId',
		component: ProfileComponent,
		data: {
			breadcrumb: 'profile',
			hidden: true,
		},
	},
	{
		path: '',
		component: ProfileComponent,
		data: {
			breadcrumb: 'profile',
			hidden: true,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
