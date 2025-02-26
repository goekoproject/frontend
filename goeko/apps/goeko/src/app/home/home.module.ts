import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ContentFulModule } from '@goeko/store'
import { ButtonModule, DialogService, GoekoButtonModule, TitlePageComponent, UiBreadcrumbsModule } from '@goeko/ui'
import { BannerComponent } from './banner/banner.component'
import { HomeRouteModule } from './home.routes'
import { HomeComponent } from './home/home.component'

import { SelectI18nComponent } from '@goeko/business-ui'
import { TranslateModule } from '@ngx-translate/core'
import { OverlayRefService } from 'libs/ui/src/lib/ui/dialog-message/overlay-ref.service'
import { ContentConfig } from '../content-ful.config'
import { FooterComponent } from '../shell/footer/footer.component'
import { AboutComponent } from './about/about/about.component'
import { SliderComponent } from './banner/slider/slider.component'
import { ContentComponent } from './content/content.component'
import { OrderByPipe } from './content/order-by.pipe'
import { DocumentLegalComponent } from './document-legal/document-legal.component'
import { HeaderComponent } from './header/header.component'
import { MenuMobileComponent } from './header/menu/menu-mobile.component'
import { MenuComponent } from './header/menu/menu.component'
import { HomeService } from './home.service'
import { LandingComponent } from './landing/landing.component'
import { ServicesComponent } from './services/services.component'
import { TeamComponent } from './team/team.component'

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    SliderComponent,
    TeamComponent,
    DocumentLegalComponent,
    LandingComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    ServicesComponent,
  ],
  imports: [
    OrderByPipe,
    CommonModule,
    HomeRouteModule,
    ButtonModule,
    ContentFulModule,
    GoekoButtonModule,
    TranslateModule,
    TitlePageComponent,
    SelectI18nComponent,
    UiBreadcrumbsModule,
    MenuMobileComponent,
    ContentComponent,
    ContentFulModule.forRoot(ContentConfig),
  ],
  providers: [DialogService, OverlayRefService, HomeService],
})
export class HomeModule {}
