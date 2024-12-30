import { CommonModule } from '@angular/common'
import { Component, computed, input, output } from '@angular/core'
import { ProductToCurrentLangPipe } from '@goeko/business-ui'
import { LocationRegionsPipe, RealStateLoanResponse } from '@goeko/store'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-card-preview-real-estate-loan',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule, ProductToCurrentLangPipe, LocationRegionsPipe],
  template: `
    @defer (when  realStateLoan()) {
      <div class="flex w-10/12 flex-col gap-6 rounded-2xl p-4 pb-10 shadow-xl">
        <h2 class="text-2xl font-semibold">{{ 'realStateLoan' | translate }}</h2>
        @for (location of realStateLoan().locations; track location?.country?.code) {
          <div class="flex gap-2">
            @for (region of location.country.regions; track region) {
              <div class="flex max-w-max gap-2 rounded-full border border-grayMedium px-3 py-1.5 text-sm font-semibold text-grayDark">
                <span class="fi fi-{{ location.country.code | lowercase }}"></span>
                <p>{{ region | locationRegions: location.country.code | async }}</p>
              </div>
            }
          </div>
        }
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">{{ 'FORM_LABEL.buildingFounding' | translate }}</h3>

          <div class="flex flex-col gap-4">
            <span class="text-grayText">{{ 'FORM_LABEL.workTypes' | translate }}</span>

            <div class="flex flex-wrap gap-2">
              @for (product of products(); track products) {
                <div class="flex max-w-max gap-2 rounded-full border border-grayMedium px-3 py-1.5 text-sm font-semibold text-grayDark">
                  <p>{{ product | productToCurrentLang }}</p>
                </div>
              }
            </div>
          </div>
        </div>
        <button type="button" go-button appearance="white" class="ml-auto" (click)="onEdit.emit({ id: realStateLoan().id })">
          {{ 'edit' | translate }}
        </button>
      </div>
    }
  `,
  styleUrl: './card-preview-real-estate-loan.component.scss',
})
export class CardPreviewRealEstateLoanComponent {
  realStateLoan = input.required<RealStateLoanResponse>()
  products = computed(() => this.realStateLoan().classifications[0].products)
  onEdit = output<{ id: string }>()
}
