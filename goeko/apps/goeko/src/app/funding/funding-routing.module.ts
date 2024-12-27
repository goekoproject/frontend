import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { groupingFormCategoriesResolver, GroupingType } from '@goeko/store'
import { FundingComponent } from './funding.component'
import { HubFundingComponent } from './hub-funding.component'
import { getKindOfFunding } from './hub-kind-of-fundind.resolver'
import { RealStateLoanComponent } from './real-state-loan-form/real-state-loan-form.component'
import { SustainbleEquipmentFormComponent } from './sustainble-equipment-form/sustainble-equipment-form.component'

const routes: Routes = [
  {
    path: ':bankId',
    component: HubFundingComponent,
    resolve: {
      kindOfFunding: getKindOfFunding,
    },
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
    path: 'king-of-funding',
    component: FundingComponent,

    children: [
      {
        path: ':bankId',
        component: SustainbleEquipmentFormComponent,
        title: 'sustainableEquipment',
        resolve: {
          categories: groupingFormCategoriesResolver,
        },
        data: {
          step: 1,
          groupingCode: GroupingType.sustainableEquipment,
        },
      },
      {
        path: 'sustainable-equipment/:bankId',
        component: SustainbleEquipmentFormComponent,
        title: 'sustainableEquipment',
        resolve: {
          categories: groupingFormCategoriesResolver,
          groupingCode: GroupingType.sustainableEquipment,
        },
        data: {
          step: 1,
        },
      },
      {
        path: 'real-state-loan/:bankId',
        component: RealStateLoanComponent,
        title: 'realStateLoan',
        data: {
          step: 2,
        },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundingRoutingModule {}
