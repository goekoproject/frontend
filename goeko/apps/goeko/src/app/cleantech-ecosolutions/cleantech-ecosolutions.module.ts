import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CardEcosolutionsComponent, CategoryModule } from '@goeko/business-ui';
import { EcosolutionsModule } from '@goeko/store';
import { BadgeModule, ButtonModule, GoInputModule, GoTabGroupModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { CleantechEcosolutionsRoutingModule } from './cleantech-ecosolutions-routing.module';
import { EcosolutionsFormComponent } from './ecosolutions-form/ecosolutions-form.component';
import { EcosolutionsListComponent } from './ecosolutions-list/ecosolutions-list.component';
import { EcosolutionsMainComponent } from './ecosolutions-main/ecosolutions-main.component';

@NgModule({
	declarations: [EcosolutionsMainComponent, EcosolutionsListComponent, EcosolutionsFormComponent],
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
		EcosolutionsModule.forRoot({
			endpoint: environment.baseUrl,
		}),
	],
})
export class CleantechEcosolutionsModule {}
