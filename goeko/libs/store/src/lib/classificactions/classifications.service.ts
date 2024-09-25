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
    return this._http.get<Category[]>(`https://abab5aa4-8b43-4dbb-b418-c76026579e27.mock.pstmn.io`).pipe(shareReplay(1))
  }
}
