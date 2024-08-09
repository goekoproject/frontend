import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, Input, inject, signal } from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LocationRegions } from '@goeko/store'
import { AutoUnsubscribe, SwitchModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { Subscription, distinctUntilChanged, filter, map, merge, mergeMap } from 'rxjs'
import { SelectLocationsService } from './select-locations.service'

const defaultSetSuperSelect = (o1: any, o2: any) => {
  if (o1 && o2 && typeof o2 !== 'object') {
    return o1.code.toString() === o2
  }

  if (o1 && o2 && typeof o2 === 'object') {
    return o1.code?.toString() === o2.code?.toString()
  }

  if (o1.isAll) {
    return true
  }

  return null
}
@AutoUnsubscribe()
@Component({
  selector: 'goeko-select-locations',
  standalone: true,
  imports: [CommonModule, TranslateModule, UiSuperSelectModule, ReactiveFormsModule, SwitchModule],
  providers: [SelectLocationsService],
  templateUrl: './select-locations.component.html',
  styleUrl: './select-locations.component.scss',
})
export class SelectLocationsComponent implements AfterViewInit {
  public defaultSetSuperSelect = defaultSetSuperSelect as (o1: any, o2: any) => boolean

  public compareSelectedCountry = (o1: any, o2: any) => {
    return o1 === o2
  }
  public optionAllProvince = {
    code: null,
    label: 'FORM_LABEL.allProvinces',
    isAll: true,
  }
  @Input() controlNameCountry!: string
  @Input() controlNameProvince!: string
  @Input()
  public get controlLocations(): FormArray {
    return this._controlLocations
  }
  public set controlLocations(value: FormArray) {
    this._controlLocations = value
  }
  private _controlLocations!: FormArray

  @Input() form!: FormGroup

  private _selectLocationsService = inject(SelectLocationsService)
  public countries = this._selectLocationsService.countries
  public regions = this._selectLocationsService.regions
  @Input()
  public toogleEdit = false
  public newLocation = false
  public disabledRegions = false

  public get lastLocations() {
    return this.controlLocations.value?.length - 1
  }
  public get controlCountryCodeByIndex() {
    return (
      ((this.form?.get('locations') as FormGroup)?.controls[this.selectedLocationsIndex()] as FormGroup)?.controls['country'] as FormGroup
    )?.controls['code']
  }
  public get controlCountryRegionsByIndex() {
    return (
      ((this.form?.get('locations') as FormGroup)?.controls[this.selectedLocationsIndex()] as FormGroup)?.controls['country'] as FormGroup
    )?.controls['regions']
  }

  public dataSourceSelect = new Map<string, any>()
  public selectedLocationsIndex = signal<number>(0)
  formArraySubscription!: Subscription
  public getOnlyRegions() {
    return this.controlCountryRegionsByIndex?.value?.filter((region: LocationRegions) => region.code !== this.optionAllProvince.code)
  }
  public getAllReggions() {
    return this.controlCountryRegionsByIndex?.value?.filter((region: LocationRegions) => region.code === this.optionAllProvince.code)
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.subscribeToFormArrayAndItemChanges()
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
    const allRegions = this.getAllReggions()
    if (allRegions) {
      this.controlCountryRegionsByIndex.patchValue(allRegions, {
        emitEvent: false,
      })
    }
  }

  deselectAll() {
    const regions = this.getOnlyRegions()
    if (regions) {
      this.controlCountryRegionsByIndex.patchValue(regions, {
        emitEvent: false,
      })
    }
  }

  addLocation() {
    this.controlLocations.push(this._createLocations())
    this.newLocation = true
    this.toogleEdit = true
    this.selectedLocationsIndex.set(this.lastLocations)
    this.subscribeToFormArrayAndItemChanges()
  }

  private _createLocations(): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl('', Validators.required),
        regions: new FormControl<any[]>(['']),
      }),
    })
  }

  editLocation(location: AbstractControl, index: number): void {
    this.toogleEdit = !this.toogleEdit
    this.selectedLocationsIndex.set(index)
  }

  closeForm() {
    this.toogleEdit = false
    this.controlLocations.removeAt(this.selectedLocationsIndex())
  }

  deleteLocation(index: number): void {
    this.controlLocations.removeAt(index)
    this.newLocation = false
  }
  confirmLocation(locationCountryControl: FormGroup | AbstractControl) {
    if (locationCountryControl.get(this.controlNameCountry)?.invalid) {
      return
    }
    this.toogleEdit = false
  }
  closeFormLocation(index: number) {
    this.deleteLocation(index)
    this.toogleEdit = false
  }
}
