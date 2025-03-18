import { Injectable, inject } from '@angular/core'
import { BankService } from '@goeko/store/bank/bank.service'
import { FINANCING_TYPE_LABEL } from '@goeko/store/constants/financing-type-label.constant'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'
import { FINANCING_TYPE_LEAD } from '@goeko/store/model/financing-type.enum'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DashboardBankService {
  private _leadService = inject(LeadBankService)
  private _bankService = inject(BankService)
  getLeads(id: string) {
    return this._leadService.getLeadByBank(id)
  }

  getLastLeads(id: string) {
    return this._leadService.getLeadByBank(id).pipe(
      map(
        (leads) =>
          leads
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // short by date
            .slice(0, 3), // get last 3 leads
      ),
      map((leads) =>
        leads.map((lead) => ({ ...lead, financingType: FINANCING_TYPE_LABEL[lead.financing?.financingType as FINANCING_TYPE_LEAD] })),
      ),
    )
  }
  getDashboardData(id: string) {
    return this._bankService.getDashboardData(id)
  }
}
