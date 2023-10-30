import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupModule, SelectI18nModule, SideProfileComponent } from '@goeko/business-ui';
import { ConfigModule } from '@goeko/core';
import { CleantechModule, ContentFulModule, SmeModule, UserService } from '@goeko/store';
import { BadgeModule, ButtonModule, UiBreadcrumbsModule } from '@goeko/ui';
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
		NxWelcomeComponent,
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
		BadgeModule,
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
	providers: [UserService],
	bootstrap: [AppComponent],
})
export class AppModule {}
