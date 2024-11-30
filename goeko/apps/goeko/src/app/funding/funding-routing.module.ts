import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FundingComponent } from './funding.component'
import { HubFundingComponent } from './hub-funding.component'
import { RealStateLoanComponent } from './real-state-loan-form/real-state-loan-form.component'
import { SustainbleEquipmentFormComponent } from './sustainble-equipment-form/sustainble-equipment-form.component'

const routes: Routes = [
  {
    path: '',
    component: FundingComponent,
    children: [
      {
        path: '',
        component: HubFundingComponent,
        data: {
          breadcrumb: 'Funding',
          hidden: true,
          onBack: false,
        },
      },
      {
        path: 'sustainable-equipment',
        component: SustainbleEquipmentFormComponent,
      },
      {
        path: 'real-state-loan',
        component: RealStateLoanComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundingRoutingModule {}
