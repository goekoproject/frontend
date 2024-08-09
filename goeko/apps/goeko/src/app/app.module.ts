import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { HttpClient } from '@angular/common/http'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PopupModule, SelectI18nComponent } from '@goeko/business-ui'
import { GoRemoteConfigModule } from '@goeko/core'
import { ContentFulModule } from '@goeko/store'
import { ButtonModule, SideDialogModule, UiBreadcrumbsModule } from '@goeko/ui'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '../environments/environment'
import { ContentConfig } from './content-ful.config'
export const httpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ContentFulModule.forRoot(ContentConfig),
    PopupModule,
    SelectI18nComponent,
    UiBreadcrumbsModule,
    SideDialogModule,
    GoRemoteConfigModule,

    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [provideFirebaseApp(() => initializeApp(environment.firebaseApp))],
  bootstrap: [AppComponent],
})
export class AppModule {}
