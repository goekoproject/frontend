import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'

import { OverlayModule } from '@angular/cdk/overlay'
import { ReactiveFormsModule } from '@angular/forms'
import {
  CategoryModule,
  CodeCountryPipe,
  GoTableModule,
  LeadFormComponent,
  LineBreakPipe,
  MessageService,
  PictureGetUrlPipe,
  ProductsManagementComponent,
  SdgIconsComponent,
  SelectSubcategoryProductComponent,
} from '@goeko/business-ui'
import { ClassificationCategoryService, EcosolutionsService, SmeModule } from '@goeko/store'
import {
  BadgeModule,
  ButtonModule,
  CardProductComponent,
  CarouselModule,
  GoDateFormatPipe,
  GoInputModule,
  GoekoButtonModule,
  InputFileComponent,
  NotificationModule,
  PercentageModule,
  ToggleSwitchComponent,
  UiSuperSelectModule,
  YesNoPipe,
} from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { CategoryRequestPipe } from './get-category-request.pipe'
import { SmeAnalysisFormRoutingModule } from './sme-analysis-form-routing.module'
import { SmeRequestAnalisysComponent } from './sme-analysis-request/sme-analysis-request.component'
import { EcosolutionListComponent } from './sme-analysis-result/ecosolution-list/ecosolution-list.component'
import { ResultDetailEcosolutionComponent } from './sme-analysis-result/result-detail-ecosolution/result-detail-ecosolution.component'
import { SmeAnalysisResultComponent } from './sme-analysis-result/sme-analysis-result.component'
import { DataArraySummaryPipe } from './sme-analysis-summary/data-array-summary.pipe'
import { SmeAnalysisSummaryComponent } from './sme-analysis-summary/sme-analysis-summary.component'
import { SmeAnalysisService } from './sme-analysis.service'
import { SmeAnalysisComponent } from './sme-analysis/sme-analysis.component'
import { CountProductPipe, CountSubcategoryPipe } from './sme-form-analysis/count-subcategory.pipe'
import { SmeFormAnalysisComponent } from './sme-form-analysis/sme-form-analysis.component'
import { SmeFormBaseComponent } from './sme-form-base/sme-form-base.component'
import { SmeFormProjectComponent } from './sme-form-project/sme-form-project.component'

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
    CategoryRequestPipe,
    CountSubcategoryPipe,
    CountProductPipe,
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
    LineBreakPipe,
    InputFileComponent,
    PictureGetUrlPipe,
    SmeModule,
    ToggleSwitchComponent,
    NotificationModule,
    CardProductComponent,
  ],
  providers: [SmeAnalysisService, MessageService, ClassificationCategoryService, EcosolutionsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SmeAnalysisFormModule {}
