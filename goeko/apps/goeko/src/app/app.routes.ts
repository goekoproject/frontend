import { Routes } from '@angular/router'
import { checkSessionUserData } from '@goeko/core'

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  //TODO:change platform.goeko.eu

  /*   {
    path: '',
    loadChildren: () => import('./platform/platform.module').then((m) => m.PlatformModule),
    canActivate: [checkSessionUserData],
  }, */
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'platform',
    loadChildren: () => import('./platform/platform.module').then((m) => m.PlatformModule),
    canActivate: [checkSessionUserData],
  },
  {
    path: 'login',
    loadChildren: () => import('./access/access.router').then((m) => m.ROUTERS),
  },

  {
    path: 'verify-email',
    loadComponent: () => import('./shell/verify-email.component').then((m) => m.VerifyEmailComponent),
  },
  {
    path: 'autenticate',
    loadComponent: () => import('@goeko/business-ui').then((m) => m.AutenticateComponent),
  },
]
