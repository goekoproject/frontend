import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateChangeService } from '../../util/translate-change'
import { Lead } from '../lead-all.interface'
import { LeadResponse } from '../lead-response.interface'
import { LeadCreateCleantech } from './lead-create-cleantech.interface'

@Injectable()
export class LeadCleantechService extends TranslateChangeService {
  constructor(private _http: HttpClient) {
    super()
    this.changeLang()
  }

  createLeadCleantech(body: LeadCreateCleantech) {
    return this._http.post(`/v1/leads/cleantech`, body)
  }

  getLeadByCleantech(userId: string): Observable<LeadResponse[]> {
    return this._http.get<LeadResponse[]>(`/v1/leads/cleantech/${userId}`)
  }

  getAllLeadsCleantech(): Observable<Lead[]> {
    return this._http.get<Lead[]>(`/v1/leads/cleantech`)
  }
}
