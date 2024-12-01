import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { RouterModule } from '@angular/router'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { FundingService } from './funding.service'

@Component({
  selector: 'goeko-hub-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ButtonModule],
  providers: [FundingService],
  templateUrl: './hub-funding.component.html',
  styleUrl: './hub-funding.component.scss',
})
export class HubFundingComponent implements OnInit {
  private _fundingService = inject(FundingService)

  susteinbleEquipment = toSignal(this._fundingService.getAllDataFromStore('sustainble-equipment'))
  constructor() {
    console.log('Hub Funding')
  }
  ngOnInit(): void {
    console.log('Hub Funding')
  }
}
