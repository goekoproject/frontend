import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RealEstateLoanResponse, SearchFinancingResponse, SustainableEquipmentResponse } from '@goeko/store'
import { FINANCING_TYPE_LABEL } from '@goeko/store/constants/financing-type-label.constant'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'
import { LeadCreateBank } from '@goeko/store/lead/bank/lead-create-bank.interface'
import { FINANCING_TYPE_LEAD } from '@goeko/store/model/financing-type.enum'
import { DialogService } from '@goeko/ui'
import { ButtonModule } from '@goeko/ui/button/button.module'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { delay, of, switchMap, tap } from 'rxjs'
import { FundingService } from '../../funding.service'
import { DataLeadBank, DialogLeadBankComponent } from '../dialog-lead-bank.component'
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
  private _dialogService = inject(DialogService)
  private _translateService = inject(TranslateService)
  searchResults = input.required<SearchFinancingResponse>()
  fundsSustainableEquipments = computed(() => this.searchResults().sustainableEquipment)
  fundRealEstateLoans = computed(() => this.searchResults().realEstate)
  id = input.required<string>()
  private _leadCreated = signal<boolean>(false)

  public isLoading = signal<boolean>(false)
  isSent = computed(() => this._leadCreated())
  selectedFunding = signal<SustainableEquipmentResponse | RealEstateLoanResponse | null>(null)

  effectOnBankLead = effect(() => {
    if (this.selectedFunding()) {
      this._openDialogLeadBank()
    }
  })
  serarchAgain = () => {
    this._fundingService.clearQuerySustainableEquipment()
    this._router.navigate(['sustainable-equipment', this.id()], { relativeTo: this._route.parent })
  }
  selectedFundingLead(funding: SustainableEquipmentResponse | RealEstateLoanResponse) {
    this.selectedFunding.set(funding)
  }
  private _openDialogLeadBank() {
    const dataDialogLeadBank: DataLeadBank = {
      financingTye: this._translateService.instant(FINANCING_TYPE_LABEL[this.selectedFunding()?.financingType as FINANCING_TYPE_LEAD]),
      bankName: this.selectedFunding()?.bank.name || '',
    }
    this._dialogService
      .open(DialogLeadBankComponent, { data: dataDialogLeadBank })
      .afterClosed()
      .pipe(
        switchMap((message: string) => {
          if (message) {
            return this._createLeadOfBank(message, this.selectedFunding() as SustainableEquipmentResponse | RealEstateLoanResponse)
          }
          return of(null)
        }),
      )
      .subscribe(() => {
        this.isLoading.set(false)
        this._leadCreated.set(true)
      })
  }

  private _createLeadOfBank(message: string, funding: SustainableEquipmentResponse | RealEstateLoanResponse) {
    const leadForBank: LeadCreateBank = {
      bankId: funding.bank.id,
      smeId: this.id(),
      financingId: funding.id,
      financingType: funding.financingType,
      message: message,
    }
    return this._fundingService.createLeadOfBank(leadForBank).pipe(
      tap(() => this.isLoading.set(true)),
      delay(1000),
    )
  }
}
