import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { of, shareReplay, tap } from 'rxjs'
import { LocationCountry, LocationRegions } from '../model/locations-data.interface'
import { SessionStorageService } from '../session-storage.service'
import { TranslateChangeService } from '../util/translate-change'

@Injectable({ providedIn: 'root' })
export class LocationsService extends TranslateChangeService {
  private _http = inject(HttpClient)
  private _sessionStorage = inject(SessionStorageService)
  constructor() {
    super()
    this.changeLang()
  }

  getCountrys() {
    if (this._getgetCountriesFromSessionStorage()) {
      return of(this._getgetCountriesFromSessionStorage())
    }
    return this._getCountriesFromApi()
  }

  getRegions(code: string) {
    if (!code) {
      return of()
    }
    return this._http.get<LocationRegions[]>(`/v1/location/country/${code}/regions/translated?lang=${this.lang()}`).pipe(shareReplay(1))
  }

  private _getgetCountriesFromSessionStorage() {
    return this._sessionStorage.getItem<LocationCountry[]>('countries')
  }
  private _getCountriesFromApi() {
    return this._http.get<LocationCountry[]>(`/v1/location/country/translated?lang=${this.lang()}`).pipe(
      tap((data) => this._sessionStorage.setItem('countries', data)),
      shareReplay(1),
    )
  }
}
