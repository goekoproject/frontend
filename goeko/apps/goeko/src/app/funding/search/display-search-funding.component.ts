import { CommonModule } from '@angular/common'
import { Component, computed, effect, input } from '@angular/core'
import { RealEstateLoanResponse, SustainableEquipmentResponse } from '@goeko/store'
import { TranslateModule } from '@ngx-translate/core'
type DataFunding = SustainableEquipmentResponse | RealEstateLoanResponse

@Component({
  selector: 'goeko-display-search-funding',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `<article class="flex items-center gap-6 rounded-2xl bg-white p-3 shadow-card">
    <!--  <img
      src="assets/images/illustrations/undraw_searching_p5ux.svg"
      alt="searching"
      width="74px"
      height="74px"
      class="rounded-lg border border-grayLight shadow-sm" /> -->

    <div class="shadow-sm flex size-20 items-center justify-center rounded-lg border border-grayLight">
      <i class="ti ti-building-bank text-5xl text-grayLight"></i>
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold">{{ nameBank() }}</h3>
      <div class="flex gap-2">
        <div class="go-badge-category">
          <p>{{ products() }}</p>
        </div>
        @if (haveGreenBonus()) {
          <span class="flex items-center gap-1 font-semibold text-greenLime">
            <i class="ti ti-check"></i>
            <p class="text-xs">{{ 'FUNDING_SUSTAINABLE_EQUIPMENT.greenBonus' | translate }}</p>
          </span>
        }
      </div>
    </div>
  </article>`,
})
export class DisplaySearchFundingComponent {
  dataFunding = input.required<DataFunding>()
  products = computed(() => this.dataFunding().classifications.filter((c) => c.products && c.products.length > 0)[0].products[0].label)
  nameBank = computed(() => this.dataFunding().bank.name)
  haveGreenBonus = computed(
    () =>
      (this.dataFunding() as SustainableEquipmentResponse).greenBonusVehicles ||
      (this.dataFunding() as SustainableEquipmentResponse).greenBonusMachines,
  )
 
}
