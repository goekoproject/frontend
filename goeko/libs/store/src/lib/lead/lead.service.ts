import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadCreate } from './lead-create.interface';
import { TranslateChangeService } from '../util/translate-change';
import { Observable } from 'rxjs';
import { LeadResponse } from './lead-response.interface';
import { Lead } from './lead-all.interface';

@Injectable()
export class LeadService extends TranslateChangeService {
  constructor(private _http: HttpClient) {
    super();
    this.changeLang();
  }

  create(body: LeadCreate) {
    const _body = {...body, lang: this.lang()}
    return this._http.post<any>(`/v1/leads/cleantech`, _body);
  }

  getLeadByCleantech(cleantechId: string): Observable<LeadResponse[]> {
    return this._http.get<LeadResponse[]>(`/v1/leads/cleantech/${cleantechId}`)
  }

  getAllLeads(): Observable<Lead[]> { 
    return this._http.get<Lead[]>(`/v1/leads/cleantech`);
  }
}
