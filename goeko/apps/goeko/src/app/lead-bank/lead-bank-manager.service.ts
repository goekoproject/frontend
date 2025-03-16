import { inject, Injectable } from '@angular/core'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LeadBankManagerService {
  private _leadServiceBank = inject(LeadBankService)

  getLeads(id: string) {
    return this._leadServiceBank.getLeadByBank(id).pipe(
      map(
        (leads) => leads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), // short by date
      ),
    )
  } 
}
