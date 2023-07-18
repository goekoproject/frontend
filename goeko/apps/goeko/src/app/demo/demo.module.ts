import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import '@goeko/ui';
import {
	ButtonModule,
	CarouselComponent,
	CarouselModule,
	GoInputDirective,
	GoekoButtonModule,
	UiSuperSelectModule,
} from '@goeko/ui';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DemoResultComponent } from './demo-result/demo-result.component';
import { SmeModule } from '@goeko/store';
import { environment } from '../../environments/environment';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	declarations: [DemoContainerComponent, GoInputDirective, DemoResultComponent],
	imports: [
		CommonModule,
		DemoRoutingModule,
		CarouselModule,
		ReactiveFormsModule,
		GoekoButtonModule,
		UiSuperSelectModule,
		OverlayModule,
		SmeModule.forRoot({
			endpoint: environment.baseUrl,
		}),
		ButtonModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DemoModule {}
