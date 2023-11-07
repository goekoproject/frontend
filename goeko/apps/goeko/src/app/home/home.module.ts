import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentFulModule } from '@goeko/store';
import { ButtonModule, GoekoButtonModule, TitlePageComponent, TooltipModule } from '@goeko/ui';
import { BannerComponent } from './banner/banner.component';
import { HomeRouteModule } from './home.routes';
import { HomeComponent } from './home/home.component';

import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AboutComponent } from './about/about/about.component';
import { ModelComponent } from './banner/model/model.component';
import { ScenesComponent } from './banner/scenes/scenes.component';
import { SphereComponent } from './banner/sphere/sphere.component';
import { ContentComponent } from './content/content.component';
import { OrderByPipe } from './content/order-by.pipe';
import { DocumentLegalComponent } from './document-legal/document-legal.component';
import { LandingComponent } from './landing/landing.component';
import { TeamComponent } from './team/team.component';

@NgModule({
	declarations: [
		HomeComponent,
		BannerComponent,
		ContentComponent,
		ModelComponent,
		SphereComponent,
		ScenesComponent,
		OrderByPipe,
		TeamComponent,
		DocumentLegalComponent,
		LandingComponent,
		AboutComponent,
	],
	imports: [
		CommonModule,
		HomeRouteModule,
		ButtonModule,
		ContentFulModule,
		AngularSvgIconModule.forRoot(),
		TooltipModule,
		GoekoButtonModule,
		TranslateModule,
		TitlePageComponent,
	],
})
export class HomeModule {}
