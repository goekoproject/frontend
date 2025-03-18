import { CommonModule } from '@angular/common'
import { Component, inject, input, signal } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { LeadBankResponse } from '@goeko/store/lead/bank/lead-bank.-response.interface'
import { GoDateFormatPipe } from '@goeko/ui'
import { AvatarComponent } from '@goeko/ui/avatar/avatar.component'
import { ChipComponent } from '@goeko/ui/chip/chip.component'
import { TranslatePipe } from '@ngx-translate/core'
import { switchMap, tap } from 'rxjs'
import { LeadBankManagerService } from './lead-bank-manager.service'

interface LeadData extends LeadBankResponse {
  initials?: string
  financingType: string
}
@Component({
  selector: 'goeko-lead-of-bank',
  standalone: true,
  imports: [CommonModule, AvatarComponent, GoDateFormatPipe, TranslatePipe, ChipComponent],
  templateUrl: './lead-of-bank.component.html',
  styleUrl: './lead-of-bank.component.scss',
})
export class LeadOfBankComponent {
  private _leadBankManagerService = inject(LeadBankManagerService)
  public id = input.required<string>()
  public leadId = input<string>()
  public leads = toSignal<LeadData[]>(
    toObservable(this.id).pipe(
      switchMap((id) => this._leadBankManagerService.getLeads(id)),
      tap((leads) => (leads ? this._setleadSelected(leads) : null)),
    ),
    { initialValue: null },
  )
  public leadSelected = signal<LeadData | null>(null)

  private _setleadSelected(leads: LeadBankResponse[]) {
    let _leadSelected: LeadData
    if (!this.leadId()) {
      _leadSelected = leads.at(0) as LeadData
    } else {
      _leadSelected = leads.find((lead) => lead.id === this.leadId()) as LeadData
    }
    this.selectLead(_leadSelected)
  }
  selectLead(lead: LeadData) {
    this.leadSelected.set({
      ...lead,
      initials: this._getInitials(lead.sme.name),
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
