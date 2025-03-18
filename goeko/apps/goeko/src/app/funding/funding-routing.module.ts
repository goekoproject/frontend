import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { groupingFormCategoriesResolver, GroupingType } from '@goeko/store'
import { FundingComponent } from './funding.component'
import { getDataRealStateLoan, getKindOfFunding, getSustainableEquipment } from './hub-kind-of-fundind.resolver'
import { HubFundingComponent } from './managment/hub-funding.component'
import { RealStateLoanComponent } from './managment/real-state-loan-form/real-state-loan-form.component'
import { SustainbleEquipmentFormComponent } from './managment/sustainble-equipment-form/sustainble-equipment-form.component'
import { searchFunding } from './search/search-funding.resolver'

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
    path: 'search',
    children: [
      {
        path: 'sustainable-equipment/:id',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () =>
          import('./search/search-sustainble-equipment-form/search-sustainble-equipment-form.component').then(
            (m) => m.SearchSustainbleEquipmentFormComponent,
          ),
        resolve: {
          categories: groupingFormCategoriesResolver,
        },
        data: {
          step: 1,
          groupingCode: GroupingType.sustainableEquipment,
        },
      },
      {
        path: 'real-state-loan',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () =>
          import('./search/search-real-estate-loan/search-real-estate-loan.component').then((m) => m.SearchRealEstateLoanComponent),
        resolve: {
          categories: groupingFormCategoriesResolver,
        },
        data: {
          step: 1,
          groupingCode: GroupingType.realEstateLoan,
        },
      },
      {
        path: 'search-results',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () =>
          import('./search/funding-matches-result/funding-matches-result.component').then((m) => m.FundingMatchesResultComponent),
        resolve: {
          searchResults: searchFunding,
        },
      },
    ],
  },

  {
    path: 'king-of-funding',
    component: FundingComponent,

    children: [
      {
        path: ':bankId',
        component: SustainbleEquipmentFormComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
        path: 'edit/sustainable-equipment/:bankId/:id',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        component: SustainbleEquipmentFormComponent,
        title: 'sustainableEquipment',
        resolve: {
          categories: groupingFormCategoriesResolver,
          dataRealEstateLoan: getSustainableEquipment,
        },
        data: {
          step: 1,
          groupingCode: GroupingType.sustainableEquipment,
        },
      },
      {
        path: 'real-state-loan/:bankId',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        component: RealStateLoanComponent,
        title: 'realStateLoan',
        resolve: {
          categories: groupingFormCategoriesResolver,
        },
        data: {
          step: 2,
          groupingCode: GroupingType.realEstateLoan,
        },
      },
      {
        path: 'edit/real-state-loan/:bankId/:id',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        component: RealStateLoanComponent,
        title: 'realStateLoan',
        resolve: {
          categories: groupingFormCategoriesResolver,
          dataRealEstateLoan: getDataRealStateLoan,
        },
        data: {
          step: 2,
          groupingCode: GroupingType.realEstateLoan,
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
