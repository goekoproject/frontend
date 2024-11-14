import { Injectable, effect, signal } from '@angular/core'
import { LocationCountry, LocationRegions, LocationsService } from '@goeko/store'

@Injectable({ providedIn: 'root' })
export class SelectLocationsService {
  selectedCodeLang = signal('')
  countries = signal<Array<LocationCountry> | null>(null)
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

  setUpCountries() {
    this._locationsService.getCountrys().subscribe((countries) => {
      if (countries) {
        this.countries.set(countries)
      }
    })
  }
}
