import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  LoadDataUser,
  PopupModule,
  SelectI18nComponent,
  SideProfileComponent,
  loadDataUserFactory,
} from '@goeko/business-ui';
import { ConfigModule, GoRemoteConfigModule } from '@goeko/core';
import {
  CleantechModule,
  ContentFulModule,
  LocationsService,
  SmeModule,
  UserService,
  isSubscribedCleantech,
} from '@goeko/store';
import {
  ButtonModule,
  NotificationService,
  SideDialogModule,
  UiBreadcrumbsModule,
} from '@goeko/ui';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { ContentConfig } from './content-ful.config';
export const httpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    SideProfileComponent,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ContentFulModule.forRoot(ContentConfig),
    PopupModule,
    SelectI18nComponent,
    UiBreadcrumbsModule,
    SideDialogModule,
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
      audience: environment.audience,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    GoRemoteConfigModule,
  ],
  providers: [
    UserService,
    LoadDataUser,
    isSubscribedCleantech,
    NotificationService,
    provideFirebaseApp(() => initializeApp(environment.firebaseApp)),

    LocationsService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: loadDataUserFactory,
      deps: [LoadDataUser],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
