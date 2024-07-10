import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule, GoInputModule, LoaderCheckComponent, NotificationModule, SwitchModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AccessRoutingModule } from './access-routing.module'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AccessRoutingModule,
    GoInputModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SwitchModule,
    UiSuperSelectModule,
    NotificationModule,
    LoaderCheckComponent,
  ],
})
export class AccessModule {}
