

import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentFulConfig } from './config.interface';


export const CONTENT_FUL_CONFIG = new InjectionToken<ContentFulConfig>('CONTENT_FUL_CONFIG');

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule, RouterModule],

})
export class ContentFulModule {
	static forRoot(config?: ContentFulConfig): ModuleWithProviders<ContentFulModule> {
		return {
			ngModule: ContentFulModule,
			providers: [
				{
					provide: CONTENT_FUL_CONFIG,
					useValue: config ? config : {},
				},
			],
		};
	}
}
