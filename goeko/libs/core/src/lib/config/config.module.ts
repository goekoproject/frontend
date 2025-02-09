import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CONFIGURATION } from './config-token'
import { EmptyElementsInterceptor } from './interceptors/empty-element.interceptor'
import { LoadingInterceptor } from './interceptors/loading.interceptor'
import { TranformDateInterceptor } from './interceptors/tranform-date.interceptor'
import { Options } from './models/options.interface'
import { authHttpInterceptor } from './modules/auth/auth.interceptor'
import { LoadingModule } from './services/loading/loading.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, LoadingModule],
  providers: [
    provideHttpClient(withInterceptors([authHttpInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TranformDateInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EmptyElementsInterceptor,
      multi: true,
    },
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
