import { Routes } from '@angular/router'
import { groupingFormCategoriesResolver } from '@goeko/store'
import { requestOnboardingMyCompanyResolver, requestOnboardingMyIdeasResolver } from './request-onboarding.resolver'

export const REQUEST_ONBOARDING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./request-onboarding.component').then((m) => m.RequestOnboardingComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./myideas/myideas.component').then((m) => m.MyideasComponent),
        resolve: {
          myIdeas: requestOnboardingMyIdeasResolver,
        },
      },
      {
        path: 'my-ideas',
        loadComponent: () => import('./myideas/myideas.component').then((m) => m.MyideasComponent),
        resolve: {
          myIdeas: requestOnboardingMyIdeasResolver,
        },
      },
      {
        path: 'company-ideas',
        loadComponent: () => import('./my-company/my-company.component').then((m) => m.MyCompanyComponent),
        resolve: {
          companyIdeas: requestOnboardingMyCompanyResolver,
        },
      },
    ],
  },
  {
    path: 'request-onboarding-form',
    loadComponent: () =>
      import('./request-onboarding-form/request-onboarding-form.component').then((m) => m.RequestOnboardingFormComponent),
    resolve: {
      groupingForm: groupingFormCategoriesResolver,
    },
  },
]
