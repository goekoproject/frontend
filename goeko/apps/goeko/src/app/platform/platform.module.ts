import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SelectI18nComponent } from '@goeko/business-ui'
import { OrderByPipe, RemoteConfigService } from '@goeko/core'
import {
  ClassificationsService,
  EcosolutionsSearchService,
  EcosolutionsTaggingService,
  GoShowUserTypeDirective,
  isSubscribedCleantech,
  LocationsService,
  ProjectService,
  SessionStorageService,
  ShowForRolesDirective,
  ToastComponent,
} from '@goeko/store'
import { BadgeModule, DialogMessageModule, DialogService, NotificationModule, NotificationService, UiBreadcrumbsModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { HeaderUserComponent } from '../shell/header-user/header-user.component'
import { MenuUserComponent } from '../shell/menu-user/menu-user.component'
import { PlatformRoutingModule } from './platform-routing.module'
import { PlatformComponent } from './platform.component'

@NgModule({
  declarations: [PlatformComponent],
  imports: [
    HeaderUserComponent,
    MenuUserComponent,
    CommonModule,
    PlatformRoutingModule,
    DialogMessageModule,
    UiBreadcrumbsModule,
    NotificationModule,
    BadgeModule,
    SelectI18nComponent,
    TranslateModule,
    ShowForRolesDirective,
    GoShowUserTypeDirective,
    ToastComponent,
    OrderByPipe,
  ],
  providers: [
    DialogService,
    isSubscribedCleantech,
    NotificationService,
    LocationsService,
    ProjectService,
    ClassificationsService,
    EcosolutionsSearchService,
    SessionStorageService,
    EcosolutionsTaggingService,
    RemoteConfigService,
  ],
})
export class PlatformModule {}
