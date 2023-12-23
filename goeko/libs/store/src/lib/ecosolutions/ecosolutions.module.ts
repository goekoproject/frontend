import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcosolutionsService } from './ecosolutions.service';
import { EcosolutionsOptions } from './ecosolutions-options';

export const ECOSOLUTIONS_CONFIGURATION = new InjectionToken<EcosolutionsOptions>('ECOSOLUTIONS_CONFIGURATION');

@NgModule({
	declarations: [],
	providers: [EcosolutionsService],
	imports: [CommonModule],
})
export class EcosolutionsModule {
	static forRoot(option: EcosolutionsOptions): ModuleWithProviders<EcosolutionsModule> {
		return {
			ngModule: EcosolutionsModule,
			providers: [
				{
					provide: ECOSOLUTIONS_CONFIGURATION,
					useValue: option ? option : {},
				},
			],
		};
	}
}
