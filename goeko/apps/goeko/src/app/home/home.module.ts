import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentFulModule } from '@goeko/store';
import { ButtonModule, GoekoButtonModule, TooltipModule } from '@goeko/ui';
import { BannerComponent } from './banner/banner.component';
import { HomeRouteModule } from './home.routes';
import { HomeComponent } from './home/home.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModelComponent } from './banner/model/model.component';
import { ScenesComponent } from './banner/scenes/scenes.component';
import { SphereComponent } from './banner/sphere/sphere.component';
import { ContentComponent } from './content/content.component';
import { OrderByPipe } from './content/order-by.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentLegalComponent } from './document-legal/document-legal.component';
import { TeamComponent } from './team/team.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { SelectI18nModule } from '@goeko/business-ui';
import { LandingComponent } from './landing/landing.component';

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
		HeaderComponent,
		MenuComponent,
		LandingComponent,
	],
	imports: [
		SelectI18nModule,
		CommonModule,
		HomeRouteModule,
		ButtonModule,
		ContentFulModule,
		AngularSvgIconModule.forRoot(),
		TooltipModule,
		GoekoButtonModule,
		TranslateModule,
	],
})
export class HomeModule {}
