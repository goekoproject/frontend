import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthGuard, goToUniversalLogin, hasRole } from '@goeko/core';
import { ROLES } from '@goeko/store';

export const appRoutes: Route[] = [
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
    canMatch: [goToUniversalLogin],
  },
  {
    path: 'autenticate',
    loadComponent: () =>
      import('@goeko/core').then((m) => m.AutenticateComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canMatch: [],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    canMatch: [],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'sme-analysis',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./sme-analysis-form/sme-analysis-form.module').then(
        (m) => m.SmeAnalysisFormModule
      ),
  },
  {
    path: 'cleantech-ecosolutions',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./cleantech-ecosolutions/cleantech-ecosolutions.module').then(
        (m) => m.CleantechEcosolutionsModule
      ),
  },
];
