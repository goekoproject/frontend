import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FundingComponent } from './funding.component'
import { RealStateLoanComponent } from './real-state-loan-form/real-state-loan-form.component'
import { SustainbleEquipmentFormComponent } from './sustainble-equipment-form/sustainble-equipment-form.component'

const routes: Routes = [
  {
    path: '',
    component: FundingComponent,
    children: [
      {
        path: '',
        component: SustainbleEquipmentFormComponent,
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
