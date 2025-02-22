import { AbstractControl, FormArray } from '@angular/forms'
import { LocationProvider } from '@goeko/store'
import { Observable, distinctUntilChanged, map, merge } from 'rxjs'

export function valueChangeArray(value: FormArray): Observable<any> {
  return merge(
    ...value.controls.map((control: AbstractControl, index: number) =>
      control.valueChanges.pipe(
        distinctUntilChanged(),
        map((value) => ({ rowIndex: index, control: control, data: value })),
      ),
    ),
  )
}

export function mapperLocations(locations: LocationProvider[]): any[] {
  return locations.map((location: LocationProvider | any) => ({
    ...location,
    country: {
      code: location?.country?.code,
      regions:
        location?.country?.regions &&
        location?.country?.regions.length > 0 &&
        location?.country?.regions?.every((region: any) => region.code)
          ? location?.country?.regions?.map((region: any) => region.code)
          : undefined,
    },
  }))
}
