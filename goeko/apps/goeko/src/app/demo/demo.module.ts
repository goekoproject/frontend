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
	GoInputModule,
	GoekoButtonModule,
	UiSuperSelectModule,
} from '@goeko/ui';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DemoResultComponent } from './demo-result/demo-result.component';
import { SmeModule } from '@goeko/store';
import { environment } from '../../environments/environment';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';

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
		SmeModule.forRoot({
			endpoint: environment.baseUrl,
		}),
		ButtonModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DemoModule {}
