import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentFulConfig } from './config.interface';
import { TranslateModule } from '@ngx-translate/core';

export const CONTENT_FUL_CONFIG = new InjectionToken<ContentFulConfig>('CONTENT_FUL_CONFIG');

@NgModule({ declarations: [], imports: [CommonModule, RouterModule, TranslateModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
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
