import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CategoryModule,
  ProductsManagementComponent,
  SdgIconsComponent,
  SelectSubcategoryProductComponent,
} from '@goeko/business-ui';
import { SmeModule } from '@goeko/store';
import {
  BadgeModule,
  ButtonModule,
  CarouselModule,
  GoInputModule,
  GoekoButtonModule,
  NotificationModule,
  PercentageModule,
  UiSuperSelectModule,
  YesNoPipe,
} from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { SmeAnalysisFormRoutingModule } from './sme-analysis-form-routing.module';
import { EcosolutionListComponent } from './sme-analysis-result/ecosolution-list/ecosolution-list.component';
import { ResultDetailEcosolutionComponent } from './sme-analysis-result/result-detail-ecosolution/result-detail-ecosolution.component';
import { SmeAnalysisResultComponent } from './sme-analysis-result/sme-analysis-result.component';
import { SmeAnalysisSummaryComponent } from './sme-analysis-summary/sme-analysis-summary.component';
import { SmeAnalysisComponent } from './sme-analysis/sme-analysis.component';
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component';
import { SmeFormBaseComponent } from './sme-form-base/sme-form-base.component';
import { SmeFormProjectComponent } from './sme-form-project/sme-form-project.component';
import { SmeAnalysisService } from './sme-analysis.service';
import { DataArraySummaryPipe } from './sme-analysis-summary/data-array-summary.pipe';

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
    SmeModule.forRoot({
      endpoint: environment.baseUrl,
    }),
  ],
  providers: [SmeAnalysisService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SmeAnalysisFormModule {}
