import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { RouterModule } from '@angular/router'
import { BadgeModule, ButtonModule, GoILeavesComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { map } from 'rxjs'
import { FundingService } from './funding.service'

@Component({
  selector: 'goeko-hub-funding',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ButtonModule, BadgeModule, GoILeavesComponent],
  providers: [FundingService],
  templateUrl: './hub-funding.component.html',
  styleUrl: './hub-funding.component.scss',
})
export class HubFundingComponent {
  private _fundingService = inject(FundingService)

  sustainbleEquipment = toSignal(this._fundingService.getAllDataFromStore('sustainble-equipment').pipe(map((data) => data[0])))
  realStateLoan = toSignal(this._fundingService.getAllDataFromStore('real-state-loan'))
}
