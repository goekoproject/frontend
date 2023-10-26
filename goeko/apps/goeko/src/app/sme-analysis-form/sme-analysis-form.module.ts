import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmeAnalysisFormRoutingModule } from './sme-analysis-form-routing.module';
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component';
import { TranslateModule } from '@ngx-translate/core';
import {
	BadgeModule,
	ButtonModule,
	CarouselModule,
	GoInputModule,
	GoekoButtonModule,
	NotificationModule,
	UiSuperSelectModule,
} from '@goeko/ui';
import { SmeModule } from '@goeko/store';
import { environment } from '../../environments/environment';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { SmeAnalysisSummaryComponent } from './sme-form-analysis/sme-analysis-summary/sme-analysis-summary.component';
import { CategoryModule } from '@goeko/business-ui';
import { SmeAnalysisService } from './sme-form-analysis/sme-analysis.service';
import { SmeAnalysisComponent } from './sme-analysis/sme-analysis.component';
import { SmeAnalysisResultComponent } from './sme-analysis-result/sme-analysis-result.component';

@NgModule({
	declarations: [
		SmeFormAnalysisComponent,
		SmeAnalysisSummaryComponent,
		SmeAnalysisComponent,
		SmeAnalysisResultComponent,
	],
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
		CategoryModule,
		BadgeModule,
		NotificationModule,
		SmeModule.forRoot({
			endpoint: environment.baseUrl,
		}),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [SmeAnalysisService],
})
export class SmeAnalysisFormModule {}
