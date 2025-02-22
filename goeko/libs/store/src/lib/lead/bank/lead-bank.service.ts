import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateChangeService } from '../../util/translate-change'
import { Lead } from '../lead-all.interface'
import { LeadBankResponse } from './lead-bank.-response.interface'
import { LeadCreateBank } from './lead-create-bank.interface'

@Injectable({ providedIn: 'root' })
export class LeadBankService extends TranslateChangeService {
  constructor(private _http: HttpClient) {
    super()
    this.changeLang()
  }

  createLeadBank(body: LeadCreateBank) {
    return this._http.post(`/v1/leads/bank`, body)
  }

  getLeadByBank(userId: string): Observable<LeadBankResponse[]> {
    return this._http.get<LeadBankResponse[]>(`/v1/leads/bank/${userId}`)
  }

  getAllLeadsBanks(): Observable<Lead[]> {
    return this._http.get<Lead[]>(`/v1/leads/bank`)
  }
}
