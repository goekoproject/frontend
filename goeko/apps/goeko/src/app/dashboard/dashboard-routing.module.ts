import { inject } from '@angular/core'
import { Routes } from '@angular/router'
import { ecosolutionFavouritesResolver, UserService } from '@goeko/store'
import { dashboardData, leadOfBank } from './dashboard-bank/dashboard-data.resolver'
import { dataSummaryResolver } from './dashboard-sme/dashboard-sme-data.resolver'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../cleantech-ecosolutions/dashboard.component').then((m) => m.DashboardComponent),
    canMatch: [
      () => {
        return inject(UserService).redirectDashboard()
      },
    ],
  },
  {
    path: 'sme/:id',
    loadComponent: () => import('./dashboard-sme/dashboard-sme.component').then((m) => m.DashboardSmeComponent),
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      summary: dataSummaryResolver,
      ecosolutionFavourites: ecosolutionFavouritesResolver,
    },
  },
  {
    path: 'cleantech/:id',
    loadComponent: () => import('./dashboard-cleantech/dashboard-cleantech.component').then((m) => m.DashboardCleantechComponent),
    data: {
      breadcrumb: 'dashboard',
      hidden: true,
      onBack: false,
    },
  },
  {
    path: 'bank/:id',
    loadComponent: () => import('./dashboard-bank/dashboard-bank.component').then((m) => m.DashboardBankComponent),
    resolve: {
      leads: leadOfBank,
      summary: dashboardData,
    },
    data: {
      breadcrumb: 'dashboard',
      hidden: true,
      onBack: false,
    },
  },
]
