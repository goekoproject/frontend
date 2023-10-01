import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigModule } from '@goeko/core';
import { ContentFulModule } from '@goeko/store';
import { ButtonModule, CarouselModule } from '@goeko/ui';
import { environment } from '../environments/environment';
import { ContentConfig } from './content-ful.config';
import { FooterComponent } from './shell/footer/footer.component';
import { HeaderComponent } from './shell/header/header.component';
import { MenuComponent } from './shell/menu/menu.component';
import { TeamComponent } from './home/team/team.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { PopupModule, SelectI18nModule } from '@goeko/business-ui';
const httpLoaderFactory = (http: HttpClient) => {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};
@NgModule({
	declarations: [AppComponent, NxWelcomeComponent, MenuComponent, HeaderComponent, FooterComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ButtonModule,
		ContentFulModule.forRoot(ContentConfig),
		SelectI18nModule,
		PopupModule,
		ConfigModule.forRoot({
			endopoint: environment.baseUrl,
			tokenAccess: environment.baseUrl,
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
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
