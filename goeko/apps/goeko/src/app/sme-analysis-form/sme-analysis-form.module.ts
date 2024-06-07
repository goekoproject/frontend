import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CategoryModule,
  CodeCountryPipe,
  GoTableModule,
  LeadFormComponent,
  MessageService,
  ProductsManagementComponent,
  SdgIconsComponent,
  SelectSubcategoryProductComponent
} from '@goeko/business-ui';
import { SmeModule } from '@goeko/store';
import {
  BadgeModule,
  ButtonModule,
  CarouselModule,
  GoDateFormatPipe,
  GoInputModule,
  GoekoButtonModule,
  NotificationModule,
  PercentageModule,
  UiSuperSelectModule,
  YesNoPipe
} from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { CategoryRequestPipe } from './get-category-request.pipe';
import { SmeAnalysisFormRoutingModule } from './sme-analysis-form-routing.module';
import { SmeRequestAnalisysComponent } from './sme-analysis-request/sme-analysis-request.component';
import { EcosolutionListComponent } from './sme-analysis-result/ecosolution-list/ecosolution-list.component';
import { ResultDetailEcosolutionComponent } from './sme-analysis-result/result-detail-ecosolution/result-detail-ecosolution.component';
import { SmeAnalysisResultComponent } from './sme-analysis-result/sme-analysis-result.component';
import { DataArraySummaryPipe } from './sme-analysis-summary/data-array-summary.pipe';
import { SmeAnalysisSummaryComponent } from './sme-analysis-summary/sme-analysis-summary.component';
import { SmeAnalysisService } from './sme-analysis.service';
import { SmeAnalysisComponent } from './sme-analysis/sme-analysis.component';
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component';
import { SmeFormBaseComponent } from './sme-form-base/sme-form-base.component';
import { SmeFormProjectComponent } from './sme-form-project/sme-form-project.component';

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
    YesNoPipe,
    DataArraySummaryPipe,
    SmeRequestAnalisysComponent,
    CategoryRequestPipe

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
    ProductsManagementComponent,
    GoTableModule, 
    CodeCountryPipe,
    LeadFormComponent,
    GoDateFormatPipe,
    SmeModule.forRoot({
      endpoint: environment.baseUrl,
    }),
  ],
  providers: [SmeAnalysisService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SmeAnalysisFormModule {}
