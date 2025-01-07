import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { groupingByClassificationsResolver } from './grouping/grouping.resolver'

const routes: Routes = [
  {
    path: 'user-data',
    loadComponent: () => import('./data-admin/admin-users.component').then((c) => c.AdminUserComponent),
  },
  {
    path: 'grouping',
    loadComponent: () => import('./grouping/grouping.component').then((c) => c.GroupingComponent),
  },
  {
    path: 'classifications/new',
    loadComponent: () => import('./grouping/new-grouping.component').then((c) => c.NewGroupingComponent),
  },
  {
    path: 'classifications/categories',
    loadComponent: () => import('./grouping/add-category-subcategory-group.component').then((c) => c.AddCategorySubcategoryGroupComponent),
  },
  {
    path: 'classifications/categories/:categoryCode/:subcategoryCode',
    loadComponent: () => import('./grouping/add-category-subcategory-group.component').then((c) => c.AddCategorySubcategoryGroupComponent),
  },
  {
    path: 'classifications/:groupingId',
    loadComponent: () => import('./grouping/admin-categories/admin-categories.component').then((c) => c.AdminCategoriesComponent),
    resolve: { classifications: groupingByClassificationsResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
