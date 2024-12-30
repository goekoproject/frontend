import { CommonModule } from '@angular/common'
import { Component, computed, inject, input } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { FINANCING_TYPE, RealStateLoanResponse } from '@goeko/store'
import { BadgeModule, ButtonModule, GoILeavesComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { CardPreviewRealEstateLoanComponent } from './card-preview-real-estate-loan.component'

@Component({
  selector: 'goeko-hub-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, CardPreviewRealEstateLoanComponent, TranslateModule, ButtonModule, BadgeModule, GoILeavesComponent],
  providers: [],
  templateUrl: './hub-funding.component.html',
  styleUrl: './hub-funding.component.scss',
})
export class HubFundingComponent {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  bankId = input.required<string>()
  kindOfFunding = input.required<{
    realStateLoan: RealStateLoanResponse[]
    sustainableEquipment: any[]
  }>()
  KIND_OF_FUNDING = FINANCING_TYPE

  sustainbleEquipment = computed(() => this.kindOfFunding().sustainableEquipment[0] as any)
  realStateLoan = computed(() => this.kindOfFunding().realStateLoan[0])

  goSustainbleEquipment = () => {
    this._router.navigate([`sustainable-equipment`, this.bankId()], { relativeTo: this._route })
  }

  goRealStateLoan = (id: string) => {
    this._router.navigate([`king-of-funding/edit/real-state-loan`, this.bankId(), id], { relativeTo: this._route.parent })
  }
}
