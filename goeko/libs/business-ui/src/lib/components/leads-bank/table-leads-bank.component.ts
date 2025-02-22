import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { LeadBankResponse } from '@goeko/store/lead/bank/lead-bank.-response.interface'
import { GoDateFormatPipe } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { GoTableModule } from './../go-table/go-table.module'

export interface TableLead {
  id: string
  date: Date
  financingType: string
  message: string
  email: string
  companyName: string
}
function transoformLeadBankResponseToTableLead(data: LeadBankResponse[]): TableLead[] {
  return data.map((lead) => ({
    id: lead.id,
    date: new Date(lead.date),
    financingType: lead.financing?.financingType,
    message: lead.message,
    companyName: lead.sme.name,
    email: lead.sme.notification.email,
  }))
}
@Component({
  selector: 'goeko-table-leads-bank',
  standalone: true,
  imports: [CommonModule, GoTableModule, TranslatePipe, GoDateFormatPipe],
  templateUrl: './table-leads-bank.component.html',
  styleUrl: './table-leads-bank.component.scss',
})
export class TableLeadsBankComponent {
  displayColumns = ['companyName', 'date', 'email', 'financingType', 'message']
  dataLeads = input<TableLead[], LeadBankResponse[]>([], {
    transform: (value) => transoformLeadBankResponseToTableLead(value),
  })
  haveActions = input<boolean>(true)
}
