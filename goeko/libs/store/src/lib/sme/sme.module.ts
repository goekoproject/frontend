import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { SmeService } from './sme.services';
import { SmeOptions } from './sme-options';
export const SME_CONFIGURATION = new InjectionToken<SmeOptions>('SME_CONFIGURATION');

@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [SmeService],
})
export class SmeModule {
	static forRoot(option: SmeOptions): ModuleWithProviders<SmeModule> {
		return {
			ngModule: SmeModule,
			providers: [
				{
					provide: SME_CONFIGURATION,
					useValue: option ? option : {},
				},
			],
		};
	}
}
