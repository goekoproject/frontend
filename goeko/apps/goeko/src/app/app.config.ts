import { HttpBackend, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'

import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router'
import { handlerHttpErrorInterceptor } from '@goeko/business-ui'
import { AuthService, CODE_LANG, ConfigModule, providerToken } from '@goeko/core'
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '../environments/environment'
import { appRoutes } from './app.routes'

const httpLoaderFactory = (httpBackend: HttpBackend) => {
  return new TranslateHttpLoader(new HttpClient(httpBackend), './assets/i18n/', '.json')
}
export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions(),
    ),
    providerToken(),
    provideRemoteConfig(() => getRemoteConfig(getApp())),
    provideHttpClient(withInterceptors([handlerHttpErrorInterceptor])),
    provideAnimations(),
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
        deps: [HttpBackend],
      },
    }),

    provideFirebaseApp(() => initializeApp(environment.firebaseApp)),
    provideFirestore(() => getFirestore()),
  ],
}
