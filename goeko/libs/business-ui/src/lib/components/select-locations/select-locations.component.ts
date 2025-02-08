import { CommonModule } from '@angular/common'
import { Component, Input, OnDestroy, OnInit, computed, effect, inject, input, output, signal } from '@angular/core'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LocationRegions, LocationsCountry } from '@goeko/store'
import { SwitchModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { Subscription, map } from 'rxjs'
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
export class SelectLocationsComponent implements OnInit, OnDestroy {
  private _translateService = inject(TranslateService)
  public countryCompareWith = (o1: string, o2: string) => o1 === o2
  public regionsCompareWith = (o1: LocationRegions, o2: LocationRegions) => o1?.code === (o2?.code || o2) || o2?.isAll

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

  public changeCountry = output<string>()
  public countries = computed(() => this._selectLocationsService.countries())
  public controlLocationsCountryValue = signal<string[]>([])

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
  public selectedCountryLocation = signal<string>(CODE_DEFAULT_COUNTRY)
  private _codeNext = computed(() => this.selectedCountryLocation())
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
  constructor() {
    effect(() => {
      if (this.selectedCountryLocation()) {
        this._getRegionsByCountryCode()
      }
    })
  }

  ngOnInit(): void {
    this._susbcribeToFormArrayChanges()

    this._selectLocationsService.setUpCountries()
    if (this.controlLocations.length === 0) {
      this.addLocation()
      this._selectDefaultCountry()
    } else {
      this._patchLocationsValue()
    }
    this._changeLang()
  }
  ngOnDestroy(): void {
    this._controlLocations.clear()
  }

  private _susbcribeToFormArrayChanges() {
    let previousValues = this.controlLocations.value

    this.controlLocations.valueChanges.pipe(map((values: LocationsCountry[], index) => ({ values, index }))).subscribe((currentValues) => {
      currentValues.values.forEach((value: any, index: any) => {
        this.controlLocationsCountryValue.set([...this.controlLocations.value.map((value: LocationsCountry) => value.country.code)])

        if (value.country.code !== previousValues.values[index]?.country?.code) {
          const { code } = value.country
          this.changeCountry.emit(code)
          if (code && !this.dataSourceSelect.has(code)) {
            this.selectedCountryLocation.set(value.country.code)
          }
        }
      })

      previousValues = currentValues
    })
  }

  private _getRegionsByCountryCode() {
    const code = this.selectedCountryLocation()
    this._selectLocationsService
      .getRegions$(code)
      .pipe(
        map((regiones) => ({ code, regiones })), // Mapea las regiones junto con el countryCode
      )
      .subscribe(({ code, regiones }) => {
        this.addRegionsForCodeCountry(code, [this.optionAllProvince, ...regiones])
        this._setAllOptionWhenEmptyRegions()
      })
  }
  private _changeLang() {
    this._translateService.onLangChange.subscribe(() => {
      this._patchLocationsValue()
      this._selectLocationsService.setUpCountries()
    })
  }
  private _patchLocationsValue() {
    this.controlLocations.value.forEach((location: LocationsCountry) => {
      const { code } = location.country
      this.selectedCountryLocation.set(code)
    })
  }

  private _setAllOptionWhenEmptyRegions() {
    this._controlLocations.controls.forEach((control) => {
      const _controlRegionsCountry = control.get('country')?.get('regions')
      if (!_controlRegionsCountry?.value) {
        _controlRegionsCountry?.patchValue([''])
        this.toogleAllRegions(true)
      }
    })
  }

  private addRegionsForCodeCountry = (clave: string, valor: any): void => {
    if (this.dataSourceSelect.has(clave)) {
      return
    }
    this.dataSourceSelect.set(clave, valor)
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
  }

  private _selectDefaultCountry() {
    this.controlLocations.at(this.selectedLocationsIndex())?.get('country')?.get('code')?.patchValue(this._codeNext())
  }

  removeLocation(index: number) {
    this.controlLocations.removeAt(index)
    this.selectedLocationsIndex.set(this.lastLocations)
  }

  private _createLocations(): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl('', Validators.required),
        regions: new FormControl<string[]>(['']),
      }),
    })
  }
}
