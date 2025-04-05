import { Routes } from '@angular/router'
import { ecosolutionsInfoResolver } from './ecosolutions-list/ecosolutions-info.resolver'

export const ROUTERS: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./ecosolutions-list/ecosolutions-list.component').then((c) => c.EcosolutionsListComponent),
    resolve: { ecosolutionsInfo: ecosolutionsInfoResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',

    /*  children: [
      {
        path: 'new/:categoryId',
        component: EcosolutionsFormComponent,
        resolve: { groupingForm: groupingFormCategoriesResolver },
        data: {
          breadcrumb: 'BREADCRUMBS.new_ecosolutions',
        },
      },
      {
        path: 'detail/:id/:categoryId',
        component: EcosolutionsFormComponent,
        data: {
          breadcrumb: 'BREADCRUMBS.view_ecosolutions',
        },
      },
      {
        path: 'edit/:id/:categoryId',
        component: EcosolutionsFormComponent,
        resolve: { groupingForm: groupingFormCategoriesResolver },
        canDeactivate: [canDeactivateGuard],
        data: {
          breadcrumb: 'BREADCRUMBS.edit_ecosolutions',
        },
      },
    ], */
  },
]
