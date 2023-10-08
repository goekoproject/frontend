import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticateComponent } from '@goeko/core';

const ROUTES: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
	{
		path: '',
		loadChildren: () => import('./langing-page/landing-page.module').then((m) => m.LandingModule),
	},

	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'demo',
		loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
	},
	{
		path: 'login',
		loadChildren: () => import('./access/access.module').then((m) => m.AccessModule),
	},
	{
		path: 'autenticate',
		component: AutenticateComponent,
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
	},
];
@NgModule({
	imports: [
		RouterModule.forRoot(ROUTES, {
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled',
			scrollOffset: [0, 100], // [x, y]
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
