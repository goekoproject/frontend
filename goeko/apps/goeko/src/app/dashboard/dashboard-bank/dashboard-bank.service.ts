import { Injectable, inject } from '@angular/core'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'

@Injectable({
  providedIn: 'root',
})
export class DashboardBankService {
  private _leadService = inject(LeadBankService)

  getLeads(id: string) {
    return this._leadService.getLeadByBank(id)
  }
}
