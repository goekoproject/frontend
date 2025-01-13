import { CommonModule } from '@angular/common'
import { Component, computed, input } from '@angular/core'
import { RealEstateLoanResponse, SustainableEquipmentResponse } from '@goeko/store'
import { TranslateModule } from '@ngx-translate/core'
type DataFunding = SustainableEquipmentResponse | RealEstateLoanResponse

@Component({
  selector: 'goeko-display-search-funding',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `<article class="flex items-center p-3 shadow-md bg-white gap-6">
    <img
      src="assets/images/illustrations/undraw_searching_p5ux.svg"
      alt="searching"
      width="74px"
      height="74px"
      class="rounded-lg border border-grayLight shadow-sm" />
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold">{{ nameBank() }}</h3>
      <div class="flex max-w-max gap-2 rounded-full border border-grayMedium px-3 py-1.5 text-sm font-semibold text-grayDark">
        <p>{{ products() }}</p>
      </div>
      @if (haveGreenBonus()) {
        <span>
          <i class="ti ri-check"></i>
          <p>{{ 'FUNDING_SUSTAINABLE_EQUIPMENT.greenBonus' | translate }}</p>
        </span>
      }
    </div>
  </article>`,
})
export class DisplaySearchFundingComponent {
  dataFunding = input.required<DataFunding>()
  products = computed(() => this.dataFunding().classifications[0].products[0].label)
  nameBank = computed(() => this.dataFunding().bank.name)
  haveGreenBonus = computed(
    () =>
      (this.dataFunding() as SustainableEquipmentResponse).greenBonusVehicles ||
      (this.dataFunding() as SustainableEquipmentResponse).greenBonusMachines,
  )
}
