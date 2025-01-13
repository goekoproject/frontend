import { CommonModule } from '@angular/common'
import { Component, computed, input } from '@angular/core'
import { SearchFinancingResponse } from '@goeko/store'
import { TranslateModule } from '@ngx-translate/core'
import { DisplaySearchFundingComponent } from '../display-search-funding.component'

@Component({
  selector: 'goeko-funding-matches-result',
  standalone: true,
  imports: [CommonModule, TranslateModule, DisplaySearchFundingComponent],
  templateUrl: './funding-matches-result.component.html',
  styleUrl: './funding-matches-result.component.scss',
})
export class FundingMatchesResultComponent {
  searchResults = input.required<SearchFinancingResponse>()
  fundsSustainableEquipments = computed(() => this.searchResults().sustainableEquipment)
  realEstateLoans = computed(() => this.searchResults().realEstate)
}
