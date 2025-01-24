import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CONFIGURATION } from './config-token'
import { EmptyElementsInterceptor } from './interceptors/empty-element.interceptor'
import { LoadingInterceptor } from './interceptors/loading.interceptor'
import { TranformDateInterceptor } from './interceptors/tranform-date.interceptor'
import { Options } from './models/options.interface'
import { AuthHttpInterceptor } from './modules/auth/auth.interceptor'
import { AuthService } from './modules/auth/auth.service'
import { LoadingModule } from './services/loading/loading.module'
import { SpinnerOverlayModule } from './services/spinner-overlay/spinner-overlay.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, LoadingModule, SpinnerOverlayModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TranformDateInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EmptyElementsInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class ConfigModule {
  static forRoot(config: Options): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: CONFIGURATION,
          useValue: config,
        },
      ],
    }
  }
}
