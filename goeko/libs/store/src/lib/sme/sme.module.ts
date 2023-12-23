import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { SmeService } from './sme.services';
import { SmeOptions } from './sme-options';
import { ProjectService } from './project.services';
export const SME_CONFIGURATION = new InjectionToken<SmeOptions>('SME_CONFIGURATION');

@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [SmeService, ProjectService],
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
