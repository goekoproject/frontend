import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { TableLeadsBankComponent } from '@goeko/business-ui/components/leads-bank/table-leads-bank.component'
import { LeadBankResponse } from '@goeko/store/lead/bank/lead-bank.-response.interface'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-dashboard-bank',
  standalone: true,
  imports: [CommonModule, TableLeadsBankComponent, TranslatePipe],
  templateUrl: './dashboard-bank.component.html',
  styleUrl: './dashboard-bank.component.scss',
})
export class DashboardBankComponent {
  public id = input.required<string>()

  leads = input.required<LeadBankResponse[]>()
  dashboardData = input.required<any>()
}
