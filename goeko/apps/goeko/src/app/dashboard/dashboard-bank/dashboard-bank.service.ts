import { Injectable, inject } from '@angular/core'
import { BankService } from '@goeko/store/bank/bank.service'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'

@Injectable({
  providedIn: 'root',
})
export class DashboardBankService {
  private _leadService = inject(LeadBankService)
  private _bankService = inject(BankService)
  getLeads(id: string) {
    return this._leadService.getLeadByBank(id)
  }
  getDashboardData(id: string) {
    return this._bankService.getDashboardData(id)
  }
}
