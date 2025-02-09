import { HttpClient } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { AuthService, CODE_LANG, ConfigModule } from '@goeko/core'
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '../environments/environment'
import { appRoutes } from './app.routes'

const httpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideRouter(appRoutes, withComponentInputBinding()),
    provideRemoteConfig(() => getRemoteConfig(getApp())),
    importProvidersFrom(
      ConfigModule.forRoot({
        endopoint: environment.baseUrl,
        clientSecret: environment.clientSecret,
        clientId: environment.clientId,
        domainAuth0: environment.domainAuth0,
        audience: environment.audience,
        connection: environment.connection,
      }),
    ),
    provideTranslateService({
      defaultLanguage: sessionStorage.getItem('lang') ?? CODE_LANG.FR,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    provideFirebaseApp(() => initializeApp(environment.firebaseApp)),
  ],
}
