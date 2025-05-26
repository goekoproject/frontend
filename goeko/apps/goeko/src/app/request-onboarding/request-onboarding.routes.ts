import { Routes } from '@angular/router'

export const REQUEST_ONBOARDING_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./request-onboarding.component').then((m) => m.RequestOnboardingComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./myideas/myideas.component').then((m) => m.MyideasComponent),
      },
    ],
  },
]
