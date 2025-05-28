import { Routes } from '@angular/router'
import { requestOnboardingResolver } from './request-onboarding.resolver'

export const REQUEST_ONBOARDING_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./request-onboarding.component').then((m) => m.RequestOnboardingComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./myideas/myideas.component').then((m) => m.MyideasComponent),
        resolve: {
          requestsOnboarding: requestOnboardingResolver,
        },
      },
    ],
  },
]
