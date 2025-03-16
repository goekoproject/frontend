import { CommonModule } from '@angular/common'
import { Component, inject, input, signal } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { FINANCING_TYPE_LABEL } from '@goeko/store/constants/financing-type-label.constant'
import { LeadBankResponse } from '@goeko/store/lead/bank/lead-bank.-response.interface'
import { FINANCING_TYPE_LEAD } from '@goeko/store/model/financing-type.enum'
import { GoDateFormatPipe } from '@goeko/ui'
import { AvatarComponent } from '@goeko/ui/avatar/avatar.component'
import { TranslatePipe } from '@ngx-translate/core'
import { switchMap, tap } from 'rxjs'
import { LeadBankManagerService } from './lead-bank-manager.service'

interface LeadData extends LeadBankResponse {
  initials: string
  financingType: string
}
@Component({
  selector: 'goeko-lead-of-bank',
  standalone: true,
  imports: [CommonModule, AvatarComponent, GoDateFormatPipe, TranslatePipe],
  templateUrl: './lead-of-bank.component.html',
  styleUrl: './lead-of-bank.component.scss',
})
export class LeadOfBankComponent {
  private _leadBankManagerService = inject(LeadBankManagerService)
  public id = input.required<string>()
  public leadId = input<string>()
  public leads = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this._leadBankManagerService.getLeads(id)),
      tap((leads) => this._setleadSelected(leads)),
    ),
    { initialValue: [] },
  )
  public leadSelected = signal<LeadData | null>(null)

  private _setleadSelected(leads: LeadBankResponse[]) {
    if (!this.leadId() || !leads) return
    const _leadSelected = leads.find((lead) => lead.id === this.leadId()) as LeadData
    this.selectLead(_leadSelected)
  }
  selectLead(lead: LeadBankResponse) {
    this.leadSelected.set({
      ...lead,
      initials: this._getInitials(lead.sme.name),
      financingType: FINANCING_TYPE_LABEL[lead.financing?.financingType as FINANCING_TYPE_LEAD],
    })
  }
  private _getInitials(name: string): string {
    return (
      name
        ?.split(' ')
        .map((n) => n.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase() || ''
    )
  }
}
