import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GoInput } from '@goeko/ui';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import '@goeko/ui';

@NgModule({
	declarations: [AppComponent, NxWelcomeComponent],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
