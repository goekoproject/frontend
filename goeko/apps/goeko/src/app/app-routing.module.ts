import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';



const ROUTES: Routes = [
{
  path: '',
  component: AppComponent,
  children: [
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    },
    {
      path: 'demo',
      loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
    },
     {
      path: 'platform',
      loadChildren: () => import('./platform/platform.module').then((m) =>m.PlatformModule)
     },
    {
      path: 'verify-email',
      loadComponent: () =>
        import('./shell/verify-email.component').then((m) => m.VerifyEmailComponent),
    },
    {
      path: 'autenticate',
      loadComponent: () =>
        import('@goeko/business-ui').then((m) => m.AutenticateComponent),
    },
     {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full'
    },
  ]
}

];
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100], // [x, y]
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
