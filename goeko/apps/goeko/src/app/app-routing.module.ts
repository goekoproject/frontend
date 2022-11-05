import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loadRemoteModule } from '@nrwl/angular/mf';

const ROUTES: Routes = [
    {
        path: '',
        loadChildren: () =>
          loadRemoteModule('home', './Module').then((m) => m.RemoteEntryModule),
      },
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
