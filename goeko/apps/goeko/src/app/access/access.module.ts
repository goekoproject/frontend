import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SelectI18nComponent } from '@goeko/business-ui'
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
import { TranslateDirective } from '@ngx-translate/core'
import { environment } from '../../environments/environment'
import { AccessRoutingModule } from './access.router'
import { AccessComponent } from './access.component'
import { AccessService } from './access.services'
import { PasswordPolicyComponent } from './password-policy/password-policy.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SignupComponent } from './signup/signup.component'

@NgModule({
  declarations: [SignupComponent, AccessComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AccessRoutingModule,
    GoInputModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateDirective,
    SwitchModule,
    UiSuperSelectModule,
    NotificationModule,
    LoaderCheckComponent,
    DialogMessageModule,
    SelectI18nComponent,
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
    PasswordPolicyComponent,
  ],
  providers: [DialogService, AccessService],
})
export class AccessModule {}
