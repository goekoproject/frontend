import { Injectable, effect, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { LocationRegions, LocationsService } from '@goeko/store'

@Injectable({ providedIn: 'root' })
export class SelectLocationsService {
  selectedCodeLang = signal('')
  private _getCountries$ = this._locationsService.getCountrys()

  countries = toSignal(this._getCountries$, { initialValue: null })
  regions = signal<Array<LocationRegions> | null>(null)
  constructor(private _locationsService: LocationsService) {
    effect(() => {
      if (this.selectedCodeLang()) {
        this.getRegions()
      }
    })
  }

  getRegions() {
    this._locationsService.getRegions(this.selectedCodeLang()).subscribe((regions) => {
      if (regions) {
        this.regions.set(regions)
      }
    })
  }

  getRegions$(code: string) {
    return this._locationsService.getRegions(code)
  }
}
