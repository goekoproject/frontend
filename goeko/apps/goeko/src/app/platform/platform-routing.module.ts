import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { canDeactivateGuard } from '@goeko/business-ui'
import { AuthGuard } from '@goeko/core'
import {
  ROLES,
  ecosolutionFavouritesResolver,
  ecosolutionSearchDetailResolver,
  groupingFormCategoriesResolver,
  hasRole,
  projectResolver,
} from '@goeko/store'
import { PlatformComponent } from './platform.component'

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
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
        loadChildren: () => import('../cleantech-ecosolutions/cleantech-ecosolutions.router').then((m) => m.ROUTERS),
      },
      {
        path: 'leads',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadChildren: () => import('../leads/leads.module').then((m) => m.LeadsModule),
      },
      {
        path: 'favourites/:id',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () => import('../ecosolutions/favourites/favourites.component').then((m) => m.FavouritesComponent),
        resolve: {
          ecosolutionFavorites: ecosolutionFavouritesResolver,
        },
        data: {
          breadcrumb: 'MENU_USER.favourites',
          hidden: true,
          onBack: false,
        },
      },

      {
        path: 'funding',
        loadChildren: () => import('../funding/funding.module').then((m) => m.FundingModule),
      },
      {
        path: 'lead-of-bank/:id',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadComponent: () => import('../lead-bank/lead-of-bank.component').then((m) => m.LeadOfBankComponent),
      },
      {
        path: 'lead-of-bank/:id/:leadId',
        canActivate: [hasRole(ROLES.PUBLIC), AuthGuard],
        canMatch: [hasRole(ROLES.PUBLIC)],
        loadComponent: () => import('../lead-bank/lead-of-bank.component').then((m) => m.LeadOfBankComponent),
      },
      {
        path: 'admin',
        canActivate: [hasRole(ROLES.ADMIN), AuthGuard],
        canMatch: [hasRole(ROLES.ADMIN)],
        loadChildren: () => import('../admin/admin-routes').then((m) => m.ADMIN_ROUTES),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
