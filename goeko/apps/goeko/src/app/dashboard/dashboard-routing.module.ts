import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardCleantechComponent } from './dashboard/dashboard-cleantech/dashboard-cleantech.component'
import { DashboardSmeComponent } from './dashboard/dashboard-sme.component'
import { DashboardBankComponent } from './dashboard/dashboard-bank/dashboard-bank.component'

const routes: Routes = [
  {
    path: 'sme/:id',
    component: DashboardSmeComponent,
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
  {
    path: 'bank/:id',
    component: DashboardBankComponent,
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
