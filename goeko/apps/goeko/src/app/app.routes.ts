import { Routes } from '@angular/router'

export const appRoutes: Routes = [
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
    loadChildren: () => import('./access/access.router').then((m) => m.ACCESS_ROUTERS),
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
    redirectTo: 'login',
    pathMatch: 'full',
  },
]
