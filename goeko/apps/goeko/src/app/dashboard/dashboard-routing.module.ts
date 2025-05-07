import { inject, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ecosolutionFavouritesResolver, EcosolutionsTaggingService, UserService } from '@goeko/store'
import { dashboardData, leadOfBank } from './dashboard-bank/dashboard-data.resolver'
import { DashboardCleantechComponent } from './dashboard-cleantech/dashboard-cleantech.component'
import { dataSummaryResolver } from './dashboard-sme/dashboard-sme-data.resolver'
import { DashboardSmeService } from './dashboard-sme/dashboard-sme.service'

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../cleantech-ecosolutions/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [
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
    component: DashboardCleantechComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DashboardSmeService, EcosolutionsTaggingService],
})
export class DashboardRoutingModule {}
