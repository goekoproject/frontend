import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AppRoutingModule } from './app-routing.module';

import { ContentFulModule } from '@goeko/store';
import { ContentConfig } from './content-ful.config';
import { MenuComponent } from './shell/menu/menu.component';
import { HeaderComponent } from './shell/header/header.component';
import { ButtonModule } from '@goeko/ui';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MenuComponent,HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ContentFulModule.forRoot(ContentConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
