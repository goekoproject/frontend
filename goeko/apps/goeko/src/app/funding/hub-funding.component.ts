import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { BadgeModule, ButtonModule, GoILeavesComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, map, switchMap } from 'rxjs'
import { FundingService } from './funding.service'
import { FinancingService } from 'libs/store/src/lib/financing/financing.service'

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
  realStateLoan = toSignal(this.realStateLoanData$)

  ngOnInit(): void {
    this._refresh$.next()
  }
  removeStoreData(storeName: string): void {
    this._fundingService.clearStore(storeName).subscribe((res) => {
      this._refresh$.next()
    })
  }

  goSustainbleEquipment = () => {
    this._router.navigate(['./fundings'], { relativeTo: this._route })
  }

  goRealStateLoan = () => {
    this._router.navigate(['./fundings/real-state-loan'], { relativeTo: this._route })
  }
}
