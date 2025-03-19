import { CommonModule } from '@angular/common'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { ContentFulConfig } from './config.interface'

export const CONTENT_FUL_CONFIG = new InjectionToken<ContentFulConfig>('CONTENT_FUL_CONFIG')

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, TranslateModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class ContentFulModule {
  static forRoot(): ModuleWithProviders<ContentFulModule> {
    return {
      ngModule: ContentFulModule,
    }
  }
}
