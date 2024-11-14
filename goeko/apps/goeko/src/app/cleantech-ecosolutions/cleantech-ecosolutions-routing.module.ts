import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
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
      },
      {
        path: 'detail/:id',
        component: EcosolutionsFormComponent,
        data: {
          breadcrumb: 'BREADCRUMBS.view_ecosolutions',
        },
      },
      {
        path: 'new',
        component: EcosolutionsFormComponent,
        data: {
          breadcrumb: 'BREADCRUMBS.new_ecosolutions',
        },
      },
      {
        path: 'edit/:id',
        component: EcosolutionsFormComponent,
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
