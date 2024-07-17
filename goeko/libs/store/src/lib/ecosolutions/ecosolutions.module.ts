import { CommonModule } from '@angular/common'
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { EcosolutionsOptions } from './ecosolutions-options'
import { EcosolutionsService } from './ecosolutions.service'
import { EcosolutionsTaggingService } from './ecosolutions.tagging.service'

export const ECOSOLUTIONS_CONFIGURATION = new InjectionToken<EcosolutionsOptions>('ECOSOLUTIONS_CONFIGURATION')

@NgModule({
  declarations: [],
  providers: [EcosolutionsService, EcosolutionsTaggingService
  ],
  imports: [CommonModule],
})
export class EcosolutionsModule {
  static forRoot(option: EcosolutionsOptions): ModuleWithProviders<EcosolutionsModule> {
    return {
      ngModule: EcosolutionsModule,
      providers: [
        {
          provide: ECOSOLUTIONS_CONFIGURATION,
          useValue: option ? option : {},
        },
      ],
    }
  }
}
