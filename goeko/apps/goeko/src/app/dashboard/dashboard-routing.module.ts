import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EcosolutionsTaggingService } from '@goeko/store'
import { DashboardCleantechComponent } from './dashboard-cleantech/dashboard-cleantech.component'
import { dataEcosolutionFavouritesResolver, dataSummaryResolver } from './dashboard-sme/dashboard-sme-data.resolver'
import { DashboardSmeService } from './dashboard-sme/dashboard-sme.service'
//import { DashboardBankComponent } from '../funding/hub-funding.component'

const routes: Routes = [
  {
    path: 'sme/:id',
    loadComponent: () => import('./dashboard-sme/dashboard-sme.component').then((m) => m.DashboardSmeComponent),
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      summary: dataSummaryResolver,
      ecosolutionFavourites: dataEcosolutionFavouritesResolver,
    },
    data: {
      breadcrumb: 'dashboard',
      hidden: true,
      onBack: false,
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DashboardSmeService, EcosolutionsTaggingService],
})
export class DashboardRoutingModule {}
