import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'admin-category',
    loadComponent: () => import('./admin-categories/admin-categories.component').then((c) => c.AdminCategoriesComponent),
  },
  {
    path: 'user-data',
    loadComponent: () => import('./data-admin/admin-users.component').then((c) => c.AdminUserComponent),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
