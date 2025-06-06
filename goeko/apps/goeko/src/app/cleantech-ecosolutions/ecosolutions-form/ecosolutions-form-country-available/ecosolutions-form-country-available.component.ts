import { CommonModule } from '@angular/common'
import { Component, computed, effect, input } from '@angular/core'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { LocationsCountry } from '@goeko/store'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-ecosolutions-form-country-available',
  standalone: true,
  imports: [CommonModule, SelectLocationsComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: './ecosolutions-form-country-available.component.html',
  styleUrl: './ecosolutions-form-country-available.component.scss',
})
export class EcosolutionsFormCountryAvailableComponent {
  public parentForm = input.required<FormGroup>()
  public ecosolutionLocation = input<Array<LocationsCountry>>()
  public locationsArrays = computed(() => this.parentForm().get('locations') as FormArray)

  effectLoadLocations = effect(() => {
    if (Array.isArray(this.ecosolutionLocation()) && (this.ecosolutionLocation()?.length || 0) > 0) {
      this._setLocaltion(this.ecosolutionLocation())
    }
  })
  private _setLocaltion(locations?: Array<LocationsCountry>) {
    if (locations) {
      this.locationsArrays().clear()
      setTimeout(() => {
        locations.forEach((location: LocationsCountry) => {
          this._addLocations(location)
        })
      })
    }
  }

  private _addLocations(location: LocationsCountry) {
    this.locationsArrays().push(this._createLocations(location))
  }
  private _createLocations(location: LocationsCountry): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(location.country.code),
        regions: new FormControl(location.country.regions),
      }),
    })
  }
}
