import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadCreate } from './lead-create.interface';
import { TranslateChangeService } from '../util/translate-change';

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
}
