import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { handlerHttpInterceptor, SelectI18nComponent } from '@goeko/business-ui'
import { ConfigModule } from '@goeko/core'
import {
  GoShowUserTypeDirective,
  isSubscribedCleantech,
  LocationsService,
  ShowForRolesDirective,
  ToastComponent,
  UserService,
} from '@goeko/store'
import {
  BadgeModule,
  DialogMessageModule,
  DialogService,
  NotificationModule,
  NotificationService,
  SideDialogModule,
  UiBreadcrumbsModule,
} from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { environment } from '../../environments/environment'
import { HeaderUserComponent } from '../shell/header-user/header-user.component'
import { MenuUserComponent } from '../shell/menu-user/menu-user.component'
import { PlatformRoutingModule } from './platform-routing.module'
import { PlatformComponent } from './platform.component'

@NgModule({
  declarations: [PlatformComponent, MenuUserComponent, HeaderUserComponent],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    DialogMessageModule,
    SideDialogModule,
    UiBreadcrumbsModule,
    NotificationModule,
    BadgeModule,
    SelectI18nComponent,
    TranslateModule,
    ShowForRolesDirective,
    GoShowUserTypeDirective,
    ToastComponent,
    ConfigModule.forRoot({
      endopoint: environment.baseUrl,
      tokenAccess: environment.accessToken,
      clientSecret: environment.clientSecret,
      clientId: environment.clientId,
      domainAuth0: environment.domainAuth0,
      audience: environment.audience,
      connection: environment.connection,
    }),
  ],
  providers: [
    DialogService,
    UserService,
    isSubscribedCleantech,
    NotificationService,
    LocationsService,

    provideHttpClient(withInterceptors([handlerHttpInterceptor])),
  ],
})
export class PlatformModule {}
