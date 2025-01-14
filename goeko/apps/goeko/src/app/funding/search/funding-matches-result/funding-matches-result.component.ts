import { CommonModule } from '@angular/common'
import { Component, computed, inject, input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SearchFinancingResponse } from '@goeko/store'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { DisplaySearchFundingComponent } from '../display-search-funding.component'
import { FundingService } from '../../funding.service'

@Component({
  selector: 'goeko-funding-matches-result',
  standalone: true,
  imports: [CommonModule, TranslateModule, DisplaySearchFundingComponent, ButtonModule],
  templateUrl: './funding-matches-result.component.html',
  styleUrl: './funding-matches-result.component.scss',
})
export class FundingMatchesResultComponent implements OnInit {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  searchResults = input.required<SearchFinancingResponse>()
  fundsSustainableEquipments = computed(() => this.searchResults().sustainableEquipment)
  fundRealEstateLoans = computed(() => this.searchResults().realEstate)
  ngOnInit(): void {
    this._fundingService.clearQuerySustainableEquipment()
  }
  serarchAgain = () => {
    this._router.navigate(['sustainable-equipment'], { relativeTo: this._route.parent })
  }
}
