import { inject, Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { map, Observable, startWith, switchMap } from 'rxjs'
import { LocationsService } from './locations.service'

@Pipe({
  name: 'locationRegions',
  standalone: true,
  pure: true,
})
export class LocationRegionsPipe implements PipeTransform {
  private _locationService = inject(LocationsService)
  private _translateService = inject(TranslateService)

  transform(value: string, country: string): Observable<string | undefined> {
    return this._translateService.onLangChange.pipe(
      startWith(null), // Emit a value immediately to trigger the initial load
      switchMap(() => this._locationService.getRegions(country)),
      map((regions) => {
        return regions.find((region) => region.code === value)?.label
      }),
    )
  }
}
