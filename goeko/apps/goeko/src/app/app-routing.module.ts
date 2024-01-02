import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, ROLE, hasRole } from '@goeko/core';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    loadChildren: () =>
      import('./langing-page/landing-page.module').then((m) => m.LandingModule),
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
    loadChildren: () =>
      import('./access/access.module').then((m) => m.AccessModule),
  },
  {
    path: 'autenticate',
    loadComponent: () =>
      import('@goeko/core').then((m) => m.AutenticateComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard, hasRole(ROLE.SME, ROLE.CLEANTECH)],
    canMatch: [hasRole(ROLE.SME, ROLE.CLEANTECH)],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard, hasRole(ROLE.SME, ROLE.CLEANTECH)],
    canMatch: [hasRole(ROLE.SME, ROLE.CLEANTECH)],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'sme-analysis',
    canActivate: [AuthGuard, hasRole(ROLE.SME)],
    canMatch: [hasRole(ROLE.SME)],
    loadChildren: () =>
      import('./sme-analysis-form/sme-analysis-form.module').then(
        (m) => m.SmeAnalysisFormModule
      ),
  },
  {
    path: 'cleantech-ecosolutions',
    canActivate: [AuthGuard, hasRole(ROLE.CLEANTECH)],
    canMatch: [hasRole(ROLE.CLEANTECH)],
    loadChildren: () =>
      import('./cleantech-ecosolutions/cleantech-ecosolutions.module').then(
        (m) => m.CleantechEcosolutionsModule
      ),
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
