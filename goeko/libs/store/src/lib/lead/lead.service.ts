import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateChangeService } from '../util/translate-change'
import { Lead } from './lead-all.interface'
import { LeadCreate } from './lead-create.interface'
import { LeadResponse } from './lead-response.interface'

@Injectable()
export class LeadService extends TranslateChangeService {
  constructor(private _http: HttpClient) {
    super()
    this.changeLang()
  }

  create(body: LeadCreate) {
    return this._http.post<any>(`/v1/leads/cleantech`, body)
  }

  getLeadByCleantech(cleantechId: string): Observable<LeadResponse[]> {
    return this._http.get<LeadResponse[]>(`/v1/leads/cleantech/${cleantechId}`)
  }

  getAllLeads(): Observable<Lead[]> {
    return this._http.get<Lead[]>(`/v1/leads/cleantech`)
  }
}
