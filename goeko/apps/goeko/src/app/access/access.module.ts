import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ConfigModule } from '@goeko/core'
import {
  AlertComponent,
  ButtonModule,
  DialogMessageModule,
  DialogService,
  GoInputModule,
  LoaderCheckComponent,
  NotificationModule,
  SwitchModule,
  TooltipComponent,
  UiSuperSelectModule,
} from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { environment } from '../../environments/environment'
import { AccessRoutingModule } from './access-routing.module'
import { AccessComponent } from './access.component'
import { AccessService } from './access.services'
import { LoginComponent } from './login/login.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SignupComponent } from './signup/signup.component'

@NgModule({
  declarations: [LoginComponent, SignupComponent, AccessComponent, ResetPasswordComponent],
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
    DialogMessageModule,
    AlertComponent,
    TooltipComponent,
    ConfigModule.forRoot({
      endopoint: environment.baseUrl,
      clientSecret: environment.clientSecret,
      clientId: environment.clientId,
      domainAuth0: environment.domainAuth0,
      audience: environment.audience,
      connection: environment.connection,
    }),
  ],
  providers: [DialogService, AccessService],
})
export class AccessModule {}
