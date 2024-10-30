import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, Input, OnDestroy, Signal, inject, input, signal } from '@angular/core'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LocationCountry, LocationRegions, LocationsCountry } from '@goeko/store'
import { SwitchModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { Subscription, distinctUntilChanged, filter, map, merge, mergeMap } from 'rxjs'
import { SelectLocationsService } from './select-locations.service'

const CODE_DEFAULT_COUNTRY = 'CH'
@Component({
  selector: 'goeko-select-locations',
  standalone: true,
  imports: [CommonModule, TranslateModule, UiSuperSelectModule, ReactiveFormsModule, SwitchModule],
  providers: [SelectLocationsService],
  templateUrl: './select-locations.component.html',
  styleUrl: './select-locations.component.scss',
})
export class SelectLocationsComponent implements AfterViewInit, OnDestroy {
  public countryCompareWith = (o1: string, o2: string) => o1 === o2
  public regionsCompareWith = (o1: LocationRegions, o2: LocationRegions) => o1.code === (o2.code || o2) || o2.isAll

  public optionAllProvince: LocationRegions = {
    code: '',
    label: 'FORM_LABEL.allProvinces',
    isAll: true,
  }
  private _selectLocationsService = inject(SelectLocationsService)

  @Input()
  public get controlLocations(): FormArray {
    return this._controlLocations
  }
  public set controlLocations(value: FormArray) {
    this._controlLocations = value
  }
  private _controlLocations!: FormArray

  @Input() form!: FormGroup
  public singleSelect = input<boolean>(false)

  public countries = this._selectLocationsService.countries as Signal<LocationCountry[]>

  public disabledRegions = false

  public get lastLocations() {
    return this.controlLocations.value?.length - 1
  }

  private get _controlCountryRegionsByIndex() {
    return (
      ((this.form?.get('locations') as FormGroup)?.controls[this.selectedLocationsIndex()] as FormGroup)?.controls['country'] as FormGroup
    )?.controls['regions']
  }

  public dataSourceSelect = new Map<string, any>()
  public selectedLocationsIndex = signal<number>(0)
  formArraySubscription!: Subscription
  public getOnlyRegions() {
    return this._controlCountryRegionsByIndex?.value?.filter((region: LocationRegions) => region.code !== this.optionAllProvince.code)
  }
  public getAllReggions() {
    return this._controlCountryRegionsByIndex?.value?.filter((region: LocationRegions) => region.code === this.optionAllProvince.code)
  }

  private toogleAllRegions = (isAll: boolean) => {
    const allRegions = this._controlCountryRegionsByIndex.value.find((region: LocationRegions) => region.isAll)
    if (allRegions) {
      this._controlCountryRegionsByIndex.value.find((region: LocationRegions) => region.isAll).isAll = isAll
    }
  }

  ngAfterViewInit(): void {
    this.subscribeToFormArrayAndItemChanges()
    if (this.controlLocations.length === 0) {
      this.addLocation()
    } else {
      this._patchLocationsValue()
    }
  }
  ngOnDestroy(): void {
    this._controlLocations.clear()
  }

  private _patchLocationsValue() {
    this.controlLocations.value.forEach((location: LocationsCountry) => {
      const { code } = location.country
      this._selectLocationsService
        .getRegions$(code)
        .pipe(
          map((regiones) => ({ code, regiones })), // Mapea las regiones junto con el countryCode
        )
        .subscribe(({ code, regiones }) => {
          this.addRegionsForCodeCountry(code, [this.optionAllProvince, ...regiones])
          this._setAllOptionWhenEmptyRegions()
        })
    })
  }
  private subscribeToFormArrayAndItemChanges(): void {
    merge(
      ...this.controlLocations.controls.map((control, index) =>
        control.valueChanges.pipe(
          map((value) => ({ index, value })),
          filter((change) => change.index >= 0), // only index positive
          distinctUntilChanged((prev, curr) => prev.value.country.code === curr.value.country.code),
          map((newValue) => newValue.value.country.code.code || newValue.value.country.code), // Transforma el cambio en el código de país
        ),
      ),
    )
      .pipe(
        mergeMap((countryCode) =>
          this._selectLocationsService.getRegions$(countryCode).pipe(
            map((regiones) => ({ countryCode, regiones })), // Mapea las regiones junto con el countryCode
          ),
        ),
      )
      .subscribe(({ countryCode, regiones }) => {
        this.addRegionsForCodeCountry(countryCode, [this.optionAllProvince, ...regiones])
        this._setAllOptionWhenEmptyRegions()
      })
  }

  private _setAllOptionWhenEmptyRegions() {
    this._controlLocations.controls.forEach((control) => {
      const _controlRegionsCountry = control.get('country')?.get('regions')
      if (_controlRegionsCountry?.value && _controlRegionsCountry.value.length === 0) {
        _controlRegionsCountry?.patchValue([''])
        this.toogleAllRegions(true)
      }
    })
  }

  private addRegionsForCodeCountry = (clave: string, valor: any): void => {
    if (this.dataSourceSelect.has(clave)) {
      this.dataSourceSelect.get(clave)?.push(valor)
    } else {
      this.dataSourceSelect.set(clave, valor)
    }
  }

  selectALL() {
    this.toogleAllRegions(true)
    const allRegions = this.getAllReggions()
    if (allRegions) {
      this._controlCountryRegionsByIndex.patchValue(allRegions, {
        emitEvent: false,
      })
    }
  }

  deselectAll() {
    this.toogleAllRegions(false)
    const regions = this.getOnlyRegions()
    if (regions) {
      this._controlCountryRegionsByIndex.patchValue(regions, {
        emitEvent: false,
      })
    }
  }

  addLocation() {
    this.controlLocations.push(this._createLocations())
    this.selectedLocationsIndex.set(this.lastLocations)
    this._patchLocationsValue()
  }

  private _createLocations(): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(CODE_DEFAULT_COUNTRY, Validators.required),
        regions: new FormControl<string[]>(['']),
      }),
    })
  }
}
