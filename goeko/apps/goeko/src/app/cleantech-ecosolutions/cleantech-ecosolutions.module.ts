import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NgxEditorModule } from 'ngx-editor'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  CardEcosolutionsComponent,
  CategoryModule,
  ProductToCurrentLangPipe,
  SdgIconsComponent,
  SelectCertificateComponent,
  SelectFormLangComponent,
  SelectLocationsComponent,
  SelectSubcategoryProductComponent,
  SubcategoryToCurrentLangPipe,
} from '@goeko/business-ui'
import { ClassificationCategoryService, ClassificationsDocumentsService, EcosolutionsModule } from '@goeko/store'
import {
  BadgeModule,
  ButtonModule,
  FILE_UPLOAD_CONFIG,
  FileUploadComponent,
  FormErrorTextComponent,
  GoInputComponent,
  GoInputModule,
  GoTabGroupModule,
  InputFileComponent,
  NotificationModule,
  UiSuperSelectModule,
} from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { environment } from '../../environments/environment'
import { CleantechEcosolutionsRoutingModule } from './cleantech-ecosolutions-routing.module'
import { CleantechEcosolutionsService } from './cleantech-ecosolutions.services'
import { EcosolutionsFormComponent } from './ecosolutions-form/ecosolutions-form.component'
import { EcosolutionsListComponent } from './ecosolutions-list/ecosolutions-list.component'
import { ProductTitlePipe } from './ecosolutions-list/product-title.pipe'
import { EcosolutionsMainComponent } from './ecosolutions-main/ecosolutions-main.component'

@NgModule({
  declarations: [EcosolutionsMainComponent, EcosolutionsListComponent, EcosolutionsFormComponent, ProductTitlePipe],
  imports: [
    InputFileComponent,
    CommonModule,
    CleantechEcosolutionsRoutingModule,
    CategoryModule,
    TranslateModule,
    GoTabGroupModule,
    CardEcosolutionsComponent,
    ReactiveFormsModule,
    FormsModule,
    GoInputModule,
    TranslateModule,
    ButtonModule,
    BadgeModule,
    NotificationModule,
    SelectSubcategoryProductComponent,
    UiSuperSelectModule,
    ProductToCurrentLangPipe,
    SdgIconsComponent,
    SubcategoryToCurrentLangPipe,
    SelectLocationsComponent,
    SelectFormLangComponent,
    InputFileComponent,
    NgxEditorModule,
    FileUploadComponent,
    GoInputComponent,
    FormErrorTextComponent,
    SelectCertificateComponent,
    EcosolutionsModule.forRoot({
      endpoint: environment.baseUrl,
    }),
  ],
  providers: [
    CleantechEcosolutionsService,
    ClassificationCategoryService,
    ClassificationsDocumentsService,
    {
      provide: FILE_UPLOAD_CONFIG,
      useValue: { maxFileSizeMB: environment.maxFileSizeMB }, // Sobrescribe el valor
    },
  ],
})
export class CleantechEcosolutionsModule {}
