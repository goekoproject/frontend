import { Injectable, inject } from '@angular/core'
import { LeadCleantechService, LeadResponse, UserService } from '@goeko/store'
import { Observable } from 'rxjs'

@Injectable()
export class ManagerLeadsService {
  private _cleantechId = inject(UserService).userProfile().id
  private _leadCleantechService = inject(LeadCleantechService)

  getLeads(): Observable<LeadResponse[]> {
    return this._leadCleantechService.getLeadByCleantech(this._cleantechId)
  }
}
