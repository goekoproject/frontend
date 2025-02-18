import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { USER_TYPE } from '../user/user-type.constants'
import { TranslateChangeService } from '../util/translate-change'
import { Lead } from './lead-all.interface'
import { LeadCreate } from './lead-create.interface'
import { LeadResponse } from './lead-response.interface'

type UserTypeForLead = USER_TYPE.BANK | USER_TYPE.CLEANTECH
@Injectable()
export class LeadService extends TranslateChangeService {
  constructor(private _http: HttpClient) {
    super()
    this.changeLang()
  }

  create(body: LeadCreate, userType: UserTypeForLead): Observable<any> {
    return this._http.post<any>(`/v1/leads/${userType}`, body)
  }

  getLeadByCleantech(userId: string, userType: UserTypeForLead): Observable<LeadResponse[]> {
    return this._http.get<LeadResponse[]>(`/v1/leads/${userType}/${userId}`)
  }

  getAllLeads(userType: UserTypeForLead): Observable<Lead[]> {
    return this._http.get<Lead[]>(`/v1/leads/${userType}`)
  }
}
