import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, goToUniversalLogin } from '@goeko/core';
import { ROLES, hasRole } from '@goeko/store';

const ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
  {
    path: 'autenticate',
    loadComponent: () =>
      import('@goeko/business-ui').then((m) => m.AutenticateComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard, hasRole(ROLES.PUBLIC)],
    canMatch: [hasRole(ROLES.PUBLIC)],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'sme-analysis',
    canActivate: [AuthGuard, hasRole(ROLES.PUBLIC)],
    canMatch: [hasRole(ROLES.PUBLIC)],
    loadChildren: () =>
      import('./sme-analysis-form/sme-analysis-form.module').then(
        (m) => m.SmeAnalysisFormModule
      ),
  },
  {
    path: 'cleantech-ecosolutions',
    canActivate: [AuthGuard, hasRole(ROLES.PUBLIC)],
    canMatch: [hasRole(ROLES.PUBLIC)],
    loadChildren: () =>
      import('./cleantech-ecosolutions/cleantech-ecosolutions.module').then(
        (m) => m.CleantechEcosolutionsModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, hasRole(ROLES.ADMIN)],
    canMatch: [hasRole(ROLES.ADMIN)],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      scrollOffset: [0, 100], // [x, y]
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
