import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FundingComponent } from './funding.component'
import { HubFundingComponent } from './hub-funding.component'
import { RealStateLoanComponent } from './real-state-loan-form/real-state-loan-form.component'
import { SustainbleEquipmentFormComponent } from './sustainble-equipment-form/sustainble-equipment-form.component'

const routes: Routes = [
  {
    path: ':bankId',
    component: HubFundingComponent,
    data: {
      breadcrumb: 'Funding',
      hidden: true,
      onBack: false,
    },
  },
  {
    path: 'matches',
    loadComponent: () => import('./funding-matches-result/funding-matches-result.component').then((m) => m.FundingMatchesResultComponent),
  },
  {
    path: 'king-of-funding/:bankId',
    component: FundingComponent,
    children: [
      {
        path: '',
        component: SustainbleEquipmentFormComponent,
        title: 'sustainableEquipment',
      },
      {
        path: 'sustainable-equipment',
        component: SustainbleEquipmentFormComponent,
        title: 'sustainableEquipment',
      },
      {
        path: 'real-state-loan',
        component: RealStateLoanComponent,
        title: 'realStateLoan',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundingRoutingModule {}
