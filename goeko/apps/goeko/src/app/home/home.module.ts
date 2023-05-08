import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentFulModule } from '@goeko/store';
import { ButtonModule, TooltipModule } from '@goeko/ui';
import { BannerComponent } from './banner/banner.component';
import { HomeRouteModule } from './home.routes';
import { HomeComponent } from './home/home.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModelComponent } from './banner/model/model.component';
import { ScenesComponent } from './banner/scenes/scenes.component';
import { SphereComponent } from './banner/sphere/sphere.component';
import { ContentComponent } from './content/content.component';
import { OrderByPipe } from './content/order-by.pipe';

@NgModule({
	declarations: [
		HomeComponent,
		BannerComponent,
		ContentComponent,
		ModelComponent,
		SphereComponent,
		ScenesComponent,
		OrderByPipe,
	],
	imports: [
		CommonModule,
		HomeRouteModule,
		ButtonModule,
		ContentFulModule,
		AngularSvgIconModule.forRoot(),
		TooltipModule,
	],
})
export class HomeModule {}
