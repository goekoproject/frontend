import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { canDeactivateGuard } from '@goeko/business-ui'
import { AuthGuard, checkSessionUserData } from '@goeko/core'
import { ROLES, ecosolutionSearchDetailResolver, groupingFormCategoriesResolver, hasRole, projectResolver } from '@goeko/store'
import { PlatformComponent } from './platform.component'

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    canActivate: [checkSessionUserData],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
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
        path: 'project-form/:smeId/:projectId',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        canDeactivate: [canDeactivateGuard],
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: { project: projectResolver, groupingForm: groupingFormCategoriesResolver },
        loadComponent: () => import('../projects/project-form/project-form.component').then((m) => m.ProjectFormComponent),
      },
      {
        path: 'search/:smeId/:projectId',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        resolve: { project: projectResolver },
        loadComponent: () =>
          import('../projects/project-ecosolutions-catalog/project-ecosolutions-catalog.component').then(
            (m) => m.ProjectEcosolutionCatalogComponent,
          ),
      },
      {
        path: 'ecosolutions-detail/:smeId/:ecosolutionId',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        resolve: { ecosolutionSearchDetail: ecosolutionSearchDetailResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () =>
          import('../projects/project-catalog-detail/project-catalog-detail.component').then((m) => m.ProjectCatalogDetailComponent),
      },
      {
        path: 'projects-list/:smeId',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadComponent: () => import('../projects/project-list/project-list.component').then((m) => m.ProjectListComponent),
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
        /*   canActivate: [hasRole(ROLES.ADMIN), AuthGuard],
        canMatch: [hasRole(ROLES.ADMIN)], */
        loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'funding',
        loadChildren: () => import('../funding/funding.module').then((m) => m.FundingModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
