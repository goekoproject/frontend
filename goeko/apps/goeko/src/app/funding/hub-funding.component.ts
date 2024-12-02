import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { RouterModule } from '@angular/router'
import { BadgeModule, ButtonModule, GoILeavesComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, map, switchMap } from 'rxjs'
import { FundingService } from './funding.service'

@Component({
  selector: 'goeko-hub-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ButtonModule, BadgeModule, GoILeavesComponent],
  providers: [FundingService],
  templateUrl: './hub-funding.component.html',
  styleUrl: './hub-funding.component.scss',
})
export class HubFundingComponent implements OnInit {
  private _fundingService = inject(FundingService)

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
}
