import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@goeko/core'
import { ROLES, hasRole } from '@goeko/store'
import { PlatformComponent } from './platform.component'

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard, hasRole(ROLES.PUBLIC)],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'sme-analysis',
        canActivate: [AuthGuard, hasRole(ROLES.PUBLIC)],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../sme-analysis-form/sme-analysis-form.module').then((m) => m.SmeAnalysisFormModule),
      },
      {
        path: 'cleantech-ecosolutions',
        canActivate: [AuthGuard, hasRole(ROLES.PUBLIC)],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../cleantech-ecosolutions/cleantech-ecosolutions.module').then((m) => m.CleantechEcosolutionsModule),
      },
      {
        path: 'leads',
        canActivate: [AuthGuard, hasRole(ROLES.PUBLIC)],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../leads/leads.module').then((m) => m.LeadsModule),
      },
      {
        path: 'favourites',
        canActivate: [AuthGuard, hasRole(ROLES.PUBLIC)],
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
        canActivate: [AuthGuard, hasRole(ROLES.ADMIN)],
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
