import { NgModule } from '@angular/core';
import { PercentageCardComponent } from './percentage-card.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		TranslateModule,
		NgCircleProgressModule.forRoot({
			radius: 50,
			outerStrokeWidth: 12,
			space: -12,
			innerStrokeWidth: 12,
			showBackground: false,
			startFromZero: true,
			showSubtitle: false,
		}),
	],
	exports: [PercentageCardComponent],
	declarations: [PercentageCardComponent],
	providers: [],
})
export class PercentageModule {}
