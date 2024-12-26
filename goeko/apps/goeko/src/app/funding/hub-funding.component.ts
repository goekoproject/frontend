import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { FINANCING_TYPE, FinancingService, RealStateLoanResponse } from '@goeko/store'
import { BadgeModule, ButtonModule, GoILeavesComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, map, switchMap } from 'rxjs'
import { FundingService } from './funding.service'

@Component({
  selector: 'goeko-hub-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ButtonModule, BadgeModule, GoILeavesComponent],
  providers: [FundingService, FinancingService],
  templateUrl: './hub-funding.component.html',
  styleUrl: './hub-funding.component.scss',
})
export class HubFundingComponent implements OnInit {
  private _fundingService = inject(FundingService)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  bankId = input.required<string>()
  kindOfFunding = input.required<{
    realStateLoan: RealStateLoanResponse[]
  }>()
  KIND_OF_FUNDING = FINANCING_TYPE
  private _refresh$ = new BehaviorSubject<void>(undefined)
  storeSustainbleEquipmentData$ = this._refresh$.pipe(
    switchMap(() => this._fundingService.getAllDataFromStore('sustainble-equipment')),
    map((data) => data[0]),
  )
  realStateLoanData$ = this._refresh$.pipe(
    switchMap(() => this._fundingService.getAllDataFromStore('real-state-loan')),
    map((data) => data[0]),
  )

  sustainbleEquipment = toSignal(this.storeSustainbleEquipmentData$)
  realStateLoan = computed(() => this.kindOfFunding().realStateLoan[0])

  constructor() {
    effect(() => {
      if (this.bankId()) {
      }
      if (this.kindOfFunding()) {
        console.log(this.kindOfFunding())
      }
    })
  }
  ngOnInit(): void {
    this._refresh$.next()
  }

  deleteFunding = (financingType: FINANCING_TYPE, id: string) => {
    this._fundingService.deleteKindOfFinancingById(financingType, id).subscribe((res) => {
      console.log(res)
    })
  }

  goSustainbleEquipment = () => {
    this._router.navigate([`sustainable-equipment`, this.bankId()], { relativeTo: this._route })
  }

  goRealStateLoan = () => {
    this._router.navigate([`real-state-loan`, this.bankId()], { relativeTo: this._route })
  }
}
