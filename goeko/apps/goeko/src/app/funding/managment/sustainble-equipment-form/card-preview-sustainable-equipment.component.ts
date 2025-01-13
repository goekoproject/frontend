import { CommonModule } from '@angular/common'
import { Component, computed, input, output } from '@angular/core'
import { ProductToCurrentLangPipe } from '@goeko/business-ui'
import { LocationRegionsPipe, Product, SustainableEquipmentResponse } from '@goeko/store'
import { ButtonModule, GoILeavesComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-card-preview-sustainable-equipment',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule, GoILeavesComponent, ProductToCurrentLangPipe, LocationRegionsPipe],
  template: `
    @if (sustainbleEquipment()) {
      <div class="flex w-10/12 flex-col gap-6 rounded-2xl p-4 pb-10 shadow-xl">
        <h2 class="text-2xl font-semibold">{{ 'sustainableEquipment' | translate }}</h2>
        @for (location of sustainbleEquipment().locations; track location?.country?.code) {
          <div class="flex flex-wrap gap-2">
            @for (region of location.country.regions; track region) {
              <div class="flex max-w-max gap-2 rounded-full border border-grayMedium px-3 py-1.5 text-sm font-semibold text-grayDark">
                <span class="fi fi-{{ location.country.code | lowercase }}"></span>
                <p>{{ region | locationRegions: location.country.code | async }}</p>
              </div>
            }
          </div>
        }
        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-semibold">{{ 'FORM_LABEL.products' | translate }}</h3>

          <div class="flex gap-8">
            @defer (when productsVehicles().length > 0) {
              <div class="flex basis-1/2 flex-col gap-4">
                <span class="text-grayText">{{ 'FUNDING_SUSTAINABLE_EQUIPMENT.vehicles' | translate }}</span>
                @if (sustainbleEquipment().greenBonusVehicles) {
                  <div class="flex">
                    <go-i-leaves></go-i-leaves>
                    <p class="font-medium">{{ 'FUNDING_SUSTAINABLE_EQUIPMENT.greenBonus' | translate }}</p>
                  </div>
                }
                <div class="flex flex-wrap gap-2">
                  @for (vehicle of productsVehicles(); track vehicle.id) {
                    <div class="flex max-w-max gap-2 rounded-full border border-grayMedium px-3 py-1.5 text-sm font-semibold text-grayDark">
                      <p>{{ vehicle | productToCurrentLang }}</p>
                    </div>
                  }
                </div>
              </div>
            }

            @defer (when productsMachines().length > 0) {
              <div class="flex flex-col gap-4">
                <span class="text-grayText">{{ 'FUNDING_SUSTAINABLE_EQUIPMENT.machines' | translate }}</span>
                @if (sustainbleEquipment().greenBonusMachines) {
                  <div class="flex">
                    <go-i-leaves></go-i-leaves>
                    <p class="font-medium">{{ 'FUNDING_SUSTAINABLE_EQUIPMENT.greenBonus' | translate }}</p>
                  </div>
                }

                <div class="flex flex-wrap gap-2">
                  @for (machine of productsMachines(); track machine.id) {
                    <div class="flex max-w-max gap-2 rounded-full border border-grayMedium px-3 py-1.5 text-sm font-semibold text-grayDark">
                      <p>{{ machine | productToCurrentLang }}</p>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
        <button type="button" go-button appearance="white" class="ml-auto" (click)="onEdit.emit({ id: sustainbleEquipment().id })">
          {{ 'edit' | translate }}
        </button>
      </div>
    }
  `,
  styleUrl: './card-preview-sustainable-equipment.component.scss',
})
export class CardPreviewSustainableEquipmentComponent {
  sustainbleEquipment = input.required<SustainableEquipmentResponse>()
  productsVehicles = computed<Product[]>(() => this.sustainbleEquipment().classifications[0].products)
  productsMachines = computed<Product[]>(() => this.sustainbleEquipment().classifications[1].products)
  onEdit = output<{ id: string }>()
}
