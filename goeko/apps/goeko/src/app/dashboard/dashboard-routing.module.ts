import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardCleantechComponent } from './dashboard/dashboard-cleantech/dashboard-cleantech.component'
//import { DashboardBankComponent } from '../funding/hub-funding.component'

const routes: Routes = [
  {
    path: 'sme/:id',
    loadComponent: () => import('./dashboard/dashboard-sme.component').then((m) => m.DashboardSmeComponent),
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
})
export class DashboardRoutingModule {}
