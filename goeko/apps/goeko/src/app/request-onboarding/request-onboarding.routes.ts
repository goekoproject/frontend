import { Routes } from '@angular/router'
import { requestOnboardingMyIdeasResolver } from './request-onboarding.resolver'
import { groupingFormCategoriesResolver } from '@goeko/store'

export const REQUEST_ONBOARDING_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./request-onboarding.component').then((m) => m.RequestOnboardingComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./myideas/myideas.component').then((m) => m.MyideasComponent),
        resolve: {
          myIdeas: requestOnboardingMyIdeasResolver,
        },
      },
    ],
  },
  {
    path: 'request-onboarding-form/:id',
    loadComponent: () =>
      import('./request-onboarding-form/request-onboarding-form.component').then((m) => m.RequestOnboardingFormComponent),
    resolve: {
      groupingForm: groupingFormCategoriesResolver,
    },
  },
]
