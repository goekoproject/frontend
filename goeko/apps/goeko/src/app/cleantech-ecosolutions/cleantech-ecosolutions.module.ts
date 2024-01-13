import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import {
  CardEcosolutionsComponent,
  CategoryModule,
  ProductToCurrentLangPipe,
  SelectSubcategoryProductComponent,
  SubcategoryToCurrentLangPipe,
} from '@goeko/business-ui';
import { EcosolutionsModule } from '@goeko/store';
import {
  BadgeModule,
  ButtonModule,
  GoInputModule,
  GoTabGroupModule,
  NotificationModule,
  UiSuperSelectModule,
} from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { CleantechEcosolutionsRoutingModule } from './cleantech-ecosolutions-routing.module';
import { EcosolutionsFormComponent } from './ecosolutions-form/ecosolutions-form.component';
import { EcosolutionsListComponent } from './ecosolutions-list/ecosolutions-list.component';
import { EcosolutionsMainComponent } from './ecosolutions-main/ecosolutions-main.component';
import { ProductTitlePipe } from './ecosolutions-list/product-title.pipe';
import { CleantechEcosolutionsService } from './cleantech-ecosolutions.services';

@NgModule({
  declarations: [
    EcosolutionsMainComponent,
    EcosolutionsListComponent,
    EcosolutionsFormComponent,
    ProductTitlePipe,
  ],
  imports: [
    CommonModule,
    CleantechEcosolutionsRoutingModule,
    CategoryModule,
    TranslateModule,
    GoTabGroupModule,
    CardEcosolutionsComponent,
    ReactiveFormsModule,
    GoInputModule,
    TranslateModule,
    ButtonModule,
    BadgeModule,
    NotificationModule,
    SelectSubcategoryProductComponent,
    UiSuperSelectModule,
    ProductToCurrentLangPipe,
    SubcategoryToCurrentLangPipe,
    EcosolutionsModule.forRoot({
      endpoint: environment.baseUrl,
    }),
  ],
  providers: [CleantechEcosolutionsService],
})
export class CleantechEcosolutionsModule {}
