import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './shell/header/header.module';

import { ContentFulModule } from '@goeko/store';
import { ContentConfig } from './content-ful.config';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    ContentFulModule.forRoot(ContentConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
