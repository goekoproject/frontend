import { CommonModule } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { TableLeadsBankComponent } from '@goeko/business-ui/components/leads-bank/table-leads-bank.component'
import { switchMap } from 'rxjs'
import { DashboardBankService } from './dashboard-bank.service'

@Component({
  selector: 'goeko-dashboard-bank',
  standalone: true,
  imports: [CommonModule, TableLeadsBankComponent],
  templateUrl: './dashboard-bank.component.html',
  styleUrl: './dashboard-bank.component.scss',
})
export class DashboardBankComponent {
  private _leadServiceBank = inject(DashboardBankService)
  public id = input.required<string>()

  leads = toSignal(toObservable(this.id).pipe(switchMap((id) => this._leadServiceBank.getLeads(id))), { initialValue: [] })
}
