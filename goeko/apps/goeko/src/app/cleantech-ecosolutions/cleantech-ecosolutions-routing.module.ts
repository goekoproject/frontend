import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { canDeactivateGuard } from '@goeko/business-ui'
import { groupingFormCategoriesResolver } from '@goeko/store'
import { EcosolutionsFormComponent } from './ecosolutions-form/ecosolutions-form.component'
import { EcosolutionsListComponent } from './ecosolutions-list/ecosolutions-list.component'
import { EcosolutionsMainComponent } from './ecosolutions-main/ecosolutions-main.component'

const routes: Routes = [
  {
    path: ':id',
    component: EcosolutionsMainComponent,
    data: {
      breadcrumb: 'Eco-solutions',
    },

    children: [
      {
        path: '',
        component: EcosolutionsListComponent,
        resolve: { groupingForm: groupingFormCategoriesResolver },
      },
      {
        path: 'new/:categoryId',
        component: EcosolutionsFormComponent,
        resolve: { groupingForm: groupingFormCategoriesResolver },
        data: {
          breadcrumb: 'BREADCRUMBS.new_ecosolutions',
        },
      },
      {
        path: 'detail/:id/:categoryId',
        component: EcosolutionsFormComponent,
        data: {
          breadcrumb: 'BREADCRUMBS.view_ecosolutions',
        },
      },
      {
        path: 'edit/:id/:categoryId',
        component: EcosolutionsFormComponent,
        resolve: { groupingForm: groupingFormCategoriesResolver },
        canDeactivate: [canDeactivateGuard],
        data: {
          breadcrumb: 'BREADCRUMBS.edit_ecosolutions',
        },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleantechEcosolutionsRoutingModule {}
