import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-categories/admin-categories.component').then(
        (c) => c.AdminCategoriesComponent
      ),
  },
  {
    path: 'user-data',
    loadComponent: () =>
      import('./data-admin/data-admin.component').then(
        (c) => c.DataAdminComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
