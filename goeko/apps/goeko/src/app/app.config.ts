import { ApplicationConfig } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core'
import { environment } from '../environments/environment'
import { appRoutes } from './app.routes'
import { CODE_LANG } from '@goeko/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'

 const httpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
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
