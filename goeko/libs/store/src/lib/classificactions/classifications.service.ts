import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, shareReplay } from 'rxjs'
import { Category } from './classifications.interface'

@Injectable({
  providedIn: 'root',
})
export class ClassificationsService {
  private _http = inject(HttpClient)

  groupingFormCategories(grouping: string = 'construction'): Observable<Category[]> {
    return this._http.get<Category[]>(`/v1/classifications/grouping/form/code/${grouping}/depth/translated?lang=fr`).pipe(shareReplay(1))
  }
}
