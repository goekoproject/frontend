import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocationRegions, LocationsService } from '@goeko/store';

@Injectable({providedIn: 'root'})
export class SelectLocationsService {
    selectedCodeLang = signal({ code: '', label: '' });
    private _getCountries$ = this._locationsService.getCountrys();
  
    countries = toSignal(this._getCountries$, { initialValue: null });
    regions = signal<Array<LocationRegions> | null>(null);
    constructor(private _locationsService: LocationsService) { }
    
    getRegions() {
        this._locationsService.getRegions(this.selectedCodeLang().code).subscribe(regions => {
          if(regions) {
            this.regions.set(regions)
          }
        })
      }
}