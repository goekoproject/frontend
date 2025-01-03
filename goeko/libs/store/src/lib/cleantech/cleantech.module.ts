import { InjectionToken, NgModule } from '@angular/core'
import { CleanTechService } from './cleanteach.services'
import { CleanTechOptions } from './cleantech-options'

export const CLEANTECH_CONFIGURATION = new InjectionToken<CleanTechOptions>('CLEANTECH_CONFIGURATION')

@NgModule({
  declarations: [],
  imports: [],
  providers: [CleanTechService],
})
export class CleantechModule {}
