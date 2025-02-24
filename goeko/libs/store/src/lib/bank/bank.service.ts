import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private _http = inject(HttpClient)
  getDashboardData(id: string): Observable<any> {
    return this._http.get<any>(`/v1/actor/banks/${id}/dashboard`)
  }
}
