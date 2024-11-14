import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { redirectIsAuthenticated } from '@goeko/core'
import { AccessComponent } from './access.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

const routes: Routes = [
  {
    path: '',
    component: AccessComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [redirectIsAuthenticated],
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessRoutingModule {}
