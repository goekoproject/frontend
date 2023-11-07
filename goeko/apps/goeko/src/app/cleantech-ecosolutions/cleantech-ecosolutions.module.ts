import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CleantechEcosolutionsRoutingModule } from './cleantech-ecosolutions-routing.module';
import { EcosolutionsMainComponent } from './ecosolutions-main/ecosolutions-main.component';
import { EcosolutionsListComponent } from './ecosolutions-list/ecosolutions-list.component';
import { CardEcosolutionsComponent, CategoryModule } from '@goeko/business-ui';
import { GoTabGroupModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { EcosolutionsModule } from '@goeko/store';
import { environment } from '../../environments/environment';

@NgModule({
	declarations: [EcosolutionsMainComponent, EcosolutionsListComponent],
	imports: [
		CommonModule,
		CleantechEcosolutionsRoutingModule,
		CategoryModule,
		TranslateModule,
		GoTabGroupModule,
		CardEcosolutionsComponent,
		EcosolutionsModule.forRoot({
			endpoint: environment.baseUrl,
		}),
	],
})
export class CleantechEcosolutionsModule {}
