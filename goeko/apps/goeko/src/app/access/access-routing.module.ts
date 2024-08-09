import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AccessComponent } from './access.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { redirectIsAuthenticated } from '@goeko/core'

const routes: Routes = [
  {
    path: '',
    component: AccessComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [redirectIsAuthenticated]
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessRoutingModule {}
