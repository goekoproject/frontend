import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BankSummary } from './bank-dashboard.interface'

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private _http = inject(HttpClient)
  getDashboardData(id: string): Observable<BankSummary> {
    return this._http.get<BankSummary>(`/v1/actor/banks/${id}/dashboard`)
  }
}
