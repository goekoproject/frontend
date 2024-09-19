import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard, checkSessionUserData } from '@goeko/core'
import { ROLES, hasRole } from '@goeko/store'
import { PlatformComponent } from './platform.component'

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    canActivate: [checkSessionUserData],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'sme-analysis',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../sme-analysis-form/sme-analysis-form.module').then((m) => m.SmeAnalysisFormModule),
      },
      {
        path: 'project-form/:id',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadComponent: () => import('../projects/project-form.component').then((m) => m.ProjectFormComponent),
      },
      {
        path: 'cleantech-ecosolutions',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../cleantech-ecosolutions/cleantech-ecosolutions.module').then((m) => m.CleantechEcosolutionsModule),
      },
      {
        path: 'leads',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../leads/leads.module').then((m) => m.LeadsModule),
      },
      {
        path: 'favourites',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadComponent: () => import('../ecosolutions/favourites/favourites.component').then((m) => m.FavouritesComponent),
        data: {
          breadcrumb: 'MENU_USER.favourites',
          hidden: true,
          onBack: false,
        },
      },
      {
        path: 'admin',
        canActivate: [hasRole(ROLES.ADMIN), AuthGuard],
        canMatch: [hasRole(ROLES.ADMIN)],
        loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
