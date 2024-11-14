import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of, shareReplay } from 'rxjs'
import { LocationCountry, LocationRegions } from '../model/locations-data.interface'
import { TranslateChangeService } from '../util/translate-change'

@Injectable({ providedIn: 'root' })
export class LocationsService extends TranslateChangeService {
  constructor(private _http: HttpClient) {
    super()
    this.changeLang()
  }

  getCountrys() {
    return this._http.get<LocationCountry[]>(`/v1/location/country/translated?lang=${this.lang()}`).pipe(shareReplay(1))
  }

  getRegions(code: string) {
    if (!code) {
      return of()
    }
    return this._http.get<LocationRegions[]>(`/v1/location/country/${code}/regions/translated?lang=${this.lang()}`).pipe(shareReplay(1))
  }
}
