/* import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./platform/platform.module').then((m) => m.PlatformModule),
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
    path: 'login',
    loadChildren: () => import('./access/access.module').then((m) => m.AccessModule),
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
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
 */
