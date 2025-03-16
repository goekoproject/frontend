import { CommonModule } from '@angular/common'
import { Component, computed, inject, input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BankDashboardRecord } from '@goeko/store/bank/bank-dashboard.interface'
import { LeadBankResponse } from '@goeko/store/lead/bank/lead-bank.-response.interface'
import { ButtonModule } from '@goeko/ui'
import { AvatarComponent } from '@goeko/ui/avatar/avatar.component'
import { ChipComponent } from '@goeko/ui/chip/chip.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-dashboard-bank',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ButtonModule, ChipComponent, AvatarComponent],
  templateUrl: './dashboard-bank.component.html',
  styleUrl: './dashboard-bank.component.scss',
})
export class DashboardBankComponent {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  public id = input.required<string>()

  leads = input.required<LeadBankResponse[]>()
  summary = input.required<BankDashboardRecord>()
  sustainableEquipmentLeads = computed(() => this.summary().sustainableEquipmentLeads)
  realEstateLeads = computed(() => this.summary().realEstateLeads)
  selectLead(lead: LeadBankResponse) {
    this._router.navigate(['lead-of-bank', this.id(), lead.id], { relativeTo: this._route.parent?.parent })
  }

  showMore() {
    this._router.navigate(['lead-of-bank', this.id()], { relativeTo: this._route.parent?.parent })
  }
}
