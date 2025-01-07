import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ClassificationsService, FinancingService } from '@goeko/store'
import { FundingRoutingModule } from './funding-routing.module'
import { FundingService } from './funding.service'

@NgModule({
  declarations: [],
  imports: [CommonModule, FundingRoutingModule],

  providers: [ClassificationsService, FundingService, FinancingService],
})
export class FundingModule {}
