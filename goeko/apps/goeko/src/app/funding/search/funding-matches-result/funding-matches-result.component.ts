import { CommonModule } from '@angular/common'
import { Component, computed, inject, input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RealEstateLoanResponse, SearchFinancingResponse, SustainableEquipmentResponse } from '@goeko/store'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { FundingService } from '../../funding.service'
import { DisplaySearchFundingComponent } from '../display-search-funding.component'

@Component({
  selector: 'goeko-funding-matches-result',
  standalone: true,
  imports: [CommonModule, TranslateModule, DisplaySearchFundingComponent, ButtonModule],
  templateUrl: './funding-matches-result.component.html',
  styleUrl: './funding-matches-result.component.scss',
})
export class FundingMatchesResultComponent {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  searchResults = input.required<SearchFinancingResponse>()
  fundsSustainableEquipments = computed(() => this.searchResults().sustainableEquipment)
  fundRealEstateLoans = computed(() => this.searchResults().realEstate)

  serarchAgain = () => {
    this._fundingService.clearQuerySustainableEquipment()
    this._router.navigate(['sustainable-equipment'], { relativeTo: this._route.parent })
  }
  onBankLead(funding: SustainableEquipmentResponse | RealEstateLoanResponse) {
    /*  this._fundingService.setBankLead(funding)
    this._router.navigate(['bank-lead'], { relativeTo: this._route.parent }) */
  }
}
