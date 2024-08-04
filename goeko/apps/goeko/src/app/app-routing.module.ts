import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@auth0/auth0-angular'
import { AppComponent } from './app.component'

const ROUTES: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'login-universal',
        loadComponent: () => import('./access/login-universal.component').then((m) => m.LoginUniversalComponent),
      },
      {
        path: 'login',
        loadChildren: () => import('./access/access.module').then((m) => m.AccessModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'platform',
        loadChildren: () => import('./platform/platform.module').then((m) => m.PlatformModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'verify-email',
        loadComponent: () => import('./shell/verify-email.component').then((m) => m.VerifyEmailComponent),
      },
      {
        path: 'autenticate',
        loadComponent: () => import('@goeko/business-ui').then((m) => m.AutenticateComponent),
      },
      /*       {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      }, */
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
