import { Injectable, inject } from '@angular/core'
import { BankService } from '@goeko/store/bank/bank.service'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'
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

  getLastLeads(id: string){
    return this._leadService.getLeadByBank(id).pipe(
      map(
        (leads) =>
          leads
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // short by date
            .slice(0, 3), // get last 3 leads
      ),
    )
  }
  getDashboardData(id: string) {
    return this._bankService.getDashboardData(id)
  }
}
