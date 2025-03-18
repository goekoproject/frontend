import { inject, Injectable } from '@angular/core'
import { FINANCING_TYPE_LABEL } from '@goeko/store/constants/financing-type-label.constant'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'
import { FINANCING_TYPE_LEAD } from '@goeko/store/model/financing-type.enum'
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
      map((leads) =>
        leads.map((lead) => ({ ...lead, financingType: FINANCING_TYPE_LABEL[lead.financing?.financingType as FINANCING_TYPE_LEAD] })),
      ),
    )
  }
}
