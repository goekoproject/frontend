import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRouteModule } from './home.routes';
import { BannerComponent } from './banner/banner.component';
import { ButtonModule } from '@goeko/ui';
import { ContentFulModule } from '@goeko/store';

import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [HomeComponent, BannerComponent, ContentComponent],
  imports: [CommonModule, HomeRouteModule, ButtonModule,ContentFulModule],
})
export class HomeModule {}