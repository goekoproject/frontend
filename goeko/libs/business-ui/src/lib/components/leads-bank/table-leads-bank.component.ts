import { FINANCING_TYPE_LABEL } from '@goeko/store/constants/financing-type-label.constant';
import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { LeadBankResponse } from '@goeko/store/lead/bank/lead-bank.-response.interface'
import { FINANCING_TYPE_LEAD } from '@goeko/store/model/financing-type.enum'
import { GoDateFormatPipe } from '@goeko/ui'
import { ChipComponent } from '@goeko/ui/chip/chip.component'
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
    financingType: FINANCING_TYPE_LABEL[lead.financing?.financingType as FINANCING_TYPE_LEAD],
    message: lead.message,
    companyName: lead.sme.name,
    email: lead.sme.notification.email,
  }))
}
@Component({
  selector: 'goeko-table-leads-bank',
  standalone: true,
  imports: [CommonModule, GoTableModule, TranslatePipe, GoDateFormatPipe, ChipComponent],
  templateUrl: './table-leads-bank.component.html',
  styleUrl: './table-leads-bank.component.scss',
})
export class TableLeadsBankComponent {
  displayColumns = ['FORM_LABEL.companyName', 'FORM_LABEL.date', 'FORM_LABEL.email', 'FORM_LABEL.financingType', 'messages']
  dataLeads = input<TableLead[], LeadBankResponse[]>([], {
    transform: (value) => transoformLeadBankResponseToTableLead(value),
  })
  haveActions = input<boolean>(true)
}
