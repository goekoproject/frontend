import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { SmeService } from './sme.services';
import { SmeOptions } from './sme-options';
import { ProjectService } from './project.services';

@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [SmeService, ProjectService],
})
export class SmeModule {}
