import { InjectionToken } from '@angular/core'
import { Options } from './models/options.interface'

export const CONFIGURATION = new InjectionToken<Options>('CONFIGURATION')
