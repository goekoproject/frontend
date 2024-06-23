import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SelectI18nComponent } from '@goeko/business-ui'
import { GoShowUserTypeDirective, ShowForRolesDirective, ToastComponent } from '@goeko/store'
import { BadgeModule, DialogMessageModule, DialogService, NotificationModule, SideDialogModule, UiBreadcrumbsModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
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
  ],
  providers: [DialogService],
})
export class PlatformModule {}
