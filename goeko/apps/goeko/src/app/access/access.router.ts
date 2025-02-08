import { Routes } from '@angular/router'
import { redirectIsAuthenticated } from '@goeko/core'
import { AccessComponent } from './access.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SignupComponent } from './signup/signup.component'

export const ACCESS_ROUTERS: Routes = [
  {
    path: '',
    component: AccessComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
        canActivate: [redirectIsAuthenticated],
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
    ],
  },
]
