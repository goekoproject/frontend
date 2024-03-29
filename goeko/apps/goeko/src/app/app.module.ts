import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import {
  LoadDataUser,
  PopupModule,
  SelectI18nModule,
  SideProfileComponent,
} from '@goeko/business-ui';
import { AUTH_CONNECT, ConfigModule } from '@goeko/core';
import {
  CleantechModule,
  ContentFulModule,
  GoShowUserTypeDirective,
  ShowForRolesDirective,
  SmeModule,
  UserService,
} from '@goeko/store';
import {
  BadgeModule,
  ButtonModule,
  DialogMessageModule,
  SideDialogModule,
  UiBreadcrumbsModule
} from '@goeko/ui';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { ContentConfig } from './content-ful.config';
import { HeaderComponent } from './home/header/header.component';
import { MenuComponent } from './home/header/menu/menu.component';
import { FooterComponent } from './shell/footer/footer.component';
import { HeaderUserComponent } from './shell/header-user/header-user.component';
import { MenuUserComponent } from './shell/menu-user/menu-user.component';
const httpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    MenuUserComponent,
    HeaderUserComponent,
  ],
  imports: [
    SideProfileComponent,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ContentFulModule.forRoot(ContentConfig),
    PopupModule,
    SelectI18nModule,
    UiBreadcrumbsModule,
    SideDialogModule,
    BadgeModule,
    ShowForRolesDirective,
    DialogMessageModule,
    AuthModule.forRoot({
      domain: environment.domainAuth0,
      clientId: environment.clientId,
      authorizationParams: {
        redirect_uri: AUTH_CONNECT.REDIRECT_URI,
        audience: AUTH_CONNECT.AUDIENCE,
      },
      httpInterceptor: {
        allowedList: [`${environment.baseUrl}/*`],
      },
    }),
    GoShowUserTypeDirective,
    SmeModule.forRoot({
      endpoint: environment.baseUrl,
    }),
    CleantechModule.forRoot({
      endpoint: environment.baseUrl,
    }),
    ConfigModule.forRoot({
      endopoint: environment.baseUrl,
      tokenAccess: environment.accessToken,
      clientSecret: environment.clientSecret,
      clientId: environment.clientId,
      domainAuth0: environment.domainAuth0,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [UserService, LoadDataUser],
  bootstrap: [AppComponent],
})
export class AppModule {}
