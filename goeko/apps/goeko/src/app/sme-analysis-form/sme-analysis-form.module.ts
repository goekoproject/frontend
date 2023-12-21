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
	PercentageCardComponent,
	PercentageModule,
	UiSuperSelectModule,
} from '@goeko/ui';
import { SmeModule } from '@goeko/store';
import { environment } from '../../environments/environment';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { SmeAnalysisSummaryComponent } from './sme-analysis-summary/sme-analysis-summary.component';
import { CategoryModule, SdgIconsComponent, SelectSubcategoryProductComponent } from '@goeko/business-ui';
import { SmeAnalysisComponent } from './sme-analysis/sme-analysis.component';
import { SmeAnalysisResultComponent } from './sme-analysis-result/sme-analysis-result.component';
import { SmeFormProjectComponent } from './sme-form-project/sme-form-project.component';
import { SmeFormBaseComponent } from './sme-form-base/sme-form-base.component';
import { ResultDetailEcosolutionComponent } from './sme-analysis-result/result-detail-ecosolution/result-detail-ecosolution.component';
import { EcosolutionListComponent } from './sme-analysis-result/ecosolution-list/ecosolution-list.component';

@NgModule({
	declarations: [
		SmeFormAnalysisComponent,
		SmeAnalysisSummaryComponent,
		SmeAnalysisComponent,
		SmeAnalysisResultComponent,
		SmeFormProjectComponent,
		SmeFormBaseComponent,
		ResultDetailEcosolutionComponent,
		EcosolutionListComponent,
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
		PercentageModule,
		BadgeModule,
		SdgIconsComponent,
		NotificationModule,
		SelectSubcategoryProductComponent,
		SmeModule.forRoot({
			endpoint: environment.baseUrl,
		}),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SmeAnalysisFormModule {}
