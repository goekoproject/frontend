import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { TranformDateInterceptor } from './interceptors/tranform-date.interceptor';
import { Options } from './models/options.interface';
import { AuthInterceptor } from './modules/auth/auth.interceptor';
import { AuthService } from './modules/auth/auth.service';
import { LoadingModule } from './services/loading/loading.module';
import { SpinnerOverlayModule } from './services/spinner-overlay/spinner-overlay.module';

export const CONFIGURATION = new InjectionToken<Options>('CONFIGURATION');

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule, RouterModule, LoadingModule, SpinnerOverlayModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: TranformDateInterceptor, multi: true },

		{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
	],
})
export class ConfigModule {
	static forRoot(config?: Options): ModuleWithProviders<ConfigModule> {
		return {
			ngModule: ConfigModule,
			providers: [
				AuthService,
				{
					provide: CONFIGURATION,
					useValue: config ? config : {},
				},
			],
		};
	}
}
