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
import { TeamComponent } from './team/team.component';

@NgModule({
	declarations: [AppComponent, NxWelcomeComponent, MenuComponent, HeaderComponent, TeamComponent, FooterComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ButtonModule,
		ContentFulModule.forRoot(ContentConfig),
		ConfigModule.forRoot({
			endopoint: environment.baseUrl,
			tokenAccess: environment.baseUrl,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
