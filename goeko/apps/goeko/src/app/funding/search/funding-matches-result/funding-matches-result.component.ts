import { CommonModule } from '@angular/common'
import { Component, computed, inject, input, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RealEstateLoanResponse, SearchFinancingResponse, SustainableEquipmentResponse } from '@goeko/store'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'
import { LeadCreateBank } from '@goeko/store/lead/bank/lead-create-bank.interface'
import { ButtonModule } from '@goeko/ui/button/button.module'
import { TranslateModule } from '@ngx-translate/core'
import { delay, tap } from 'rxjs'
import { FundingService } from '../../funding.service'
import { DisplaySearchFundingComponent } from '../display-search-funding.component'

@Component({
  selector: 'goeko-funding-matches-result',
  standalone: true,
  imports: [CommonModule, TranslateModule, DisplaySearchFundingComponent, ButtonModule],
  providers: [LeadBankService],
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
  id = input.required<string>()

  public isLoading = signal<boolean>(false)
  serarchAgain = () => {
    this._fundingService.clearQuerySustainableEquipment()
    this._router.navigate(['sustainable-equipment'], { relativeTo: this._route.parent })
  }
  onBankLead(funding: SustainableEquipmentResponse | RealEstateLoanResponse) {
    const leadForBank: LeadCreateBank = {
      bankId: funding.bank.id,
      smeId: this.id(),
      financingId: funding.id,
      financingType: funding.financingType,
      message: 'ss',
    }
    this._fundingService
      .createLeadOfBank(leadForBank)
      .pipe(
        tap(() => this.isLoading.set(true)),
        delay(1000),
      )
      .subscribe(() => {
        this.isLoading.set(false)
      })
  }
}
