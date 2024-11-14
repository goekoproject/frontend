import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { SmeModule } from '@goeko/store';
import '@goeko/ui';
import {
	ButtonModule,
	CarouselModule,
	GoInputModule,
	GoekoButtonModule,
	UiSuperSelectModule
} from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { DemoContainerComponent } from './demo-container/demo-container.component';
import { DemoResultComponent } from './demo-result/demo-result.component';
import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
	declarations: [DemoContainerComponent, DemoResultComponent],
	imports: [
		CommonModule,
		DemoRoutingModule,
		CarouselModule,
		ReactiveFormsModule,
		GoekoButtonModule,
		UiSuperSelectModule,
		OverlayModule,
		TranslateModule,
		GoInputModule,
		SmeModule,
		ButtonModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DemoModule {}
