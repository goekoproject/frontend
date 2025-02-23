import { inject, Injectable } from '@angular/core'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LeadBankManagerService {
  private _leadServiceBank = inject(LeadBankService)

  getLeads(id: string): Observable<any> {
    return this._leadServiceBank.getLeadByBank(id)
  }
}
