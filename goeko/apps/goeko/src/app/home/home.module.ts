import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRouteModule } from './home.routes';
import { BannerComponent } from './banner/banner.component';
import { ButtonModule } from '@goeko/ui';
import { ContentFulModule } from '@goeko/store';

import { ContentComponent } from './content/content.component';
import { ModelComponent } from './banner/model/model.component';
import { SphereComponent } from './banner/sphere/sphere.component';
import { ScenesComponent } from './banner/scenes/scenes.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ContentComponent,
    ModelComponent,
    SphereComponent,
    ScenesComponent,
  ],
  imports: [CommonModule, HomeRouteModule, ButtonModule, ContentFulModule],
})
export class HomeModule {}
