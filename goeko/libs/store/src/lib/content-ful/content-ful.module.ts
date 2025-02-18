import { CommonModule } from '@angular/common'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { ContentFulConfig } from './config.interface'
import { ContentFulService } from './content-ful.service'

export const CONTENT_FUL_CONFIG = new InjectionToken<ContentFulConfig>('CONTENT_FUL_CONFIG')

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class ContentFulModule {
  static forRoot(config?: ContentFulConfig): ModuleWithProviders<ContentFulModule> {
    return {
      ngModule: ContentFulModule,
      providers: [
        ContentFulService,
        {
          provide: CONTENT_FUL_CONFIG,
          useValue: config ? config : {},
        },
      ],
    }
  }
}
