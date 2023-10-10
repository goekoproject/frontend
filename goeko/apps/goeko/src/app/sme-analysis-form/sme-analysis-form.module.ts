import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmeAnalysisFormRoutingModule } from './sme-analysis-form-routing.module';
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule, CarouselModule, GoInputModule, GoekoButtonModule, UiSuperSelectModule } from '@goeko/ui';
import { SmeModule } from '@goeko/store';
import { environment } from '../../environments/environment';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [SmeFormAnalysisComponent],
	imports: [
		CommonModule,
		SmeAnalysisFormRoutingModule,
		TranslateModule,
		GoInputModule,
		UiSuperSelectModule,
		ButtonModule,
		ReactiveFormsModule,
		CarouselModule,
		OverlayModule,
		GoekoButtonModule,
		SmeModule.forRoot({
			endpoint: environment.baseUrl,
		}),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SmeAnalysisFormModule {}
