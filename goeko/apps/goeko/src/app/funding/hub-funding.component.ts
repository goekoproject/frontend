import { CommonModule } from '@angular/common'
import { Component, computed, inject, input } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { FINANCING_TYPE, RealStateLoanResponse, SustainableEquipmentResponse } from '@goeko/store'
import { BadgeModule, ButtonModule, GoILeavesComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { CardPreviewRealEstateLoanComponent } from './card-preview-real-estate-loan.component'
import { CardPreviewSustainableEquipmentComponent } from './card-preview-sustainable-equipment.component'

@Component({
  selector: 'goeko-hub-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, CardPreviewRealEstateLoanComponent, CardPreviewSustainableEquipmentComponent, TranslateModule, ButtonModule, BadgeModule, GoILeavesComponent],
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
    sustainableEquipment: SustainableEquipmentResponse[]
  }>()
  KIND_OF_FUNDING = FINANCING_TYPE

  sustainbleEquipment = computed(() => this.kindOfFunding().sustainableEquipment[0])
  realStateLoan = computed(() => this.kindOfFunding().realStateLoan[0])

  goSustainbleEquipment = (id?: string) => {
    if (id) {
      this._router.navigate([`king-of-funding/edit/sustainable-equipment`, this.bankId(), id], { relativeTo: this._route.parent })
    } else {
      this._router.navigate([`king-of-funding/sustainable-equipment`, this.bankId()], {
        relativeTo: this._route.parent,
      })
    }
  }

  goRealStateLoan = (id?: string) => {
    if (id) {
      this._router.navigate([`king-of-funding/edit/real-state-loan`, this.bankId(), id], { relativeTo: this._route.parent })
    } else {
      this._router.navigate([`king-of-funding/real-state-loan`, this.bankId()], { relativeTo: this._route.parent })
    }
  }
}