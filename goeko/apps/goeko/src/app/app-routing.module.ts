import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'

const ROUTES: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login-universal',
        loadComponent: () => import('./access/login-universal.component').then((m) => m.LoginUniversalComponent),
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'platform',
        loadChildren: () => import('./platform/platform.module').then((m) => m.PlatformModule),
      },
      {
        path: 'verify-email',
        loadComponent: () => import('./shell/verify-email.component').then((m) => m.VerifyEmailComponent),
      },
      {
        path: 'autenticate',
        loadComponent: () => import('@goeko/business-ui').then((m) => m.AutenticateComponent),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
]
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
