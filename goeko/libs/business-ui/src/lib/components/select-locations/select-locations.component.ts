import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, effect, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationRegions } from '@goeko/store';
import { AutoUnsubscribe, SwitchModule, UiSuperSelectModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, Subscription, distinctUntilChanged, filter, map, merge, mergeMap, takeUntil } from 'rxjs';
import { SelectLocationsService } from './select-locations.service';

const defaultSetSuperSelect = (o1: any, o2: any) => {
  if (o1 && o2 && typeof o2 !== 'object') {
    return o1.code.toString() === o2;
  }

  if (o1 && o2 && typeof o2 === 'object') {
    return o1.code?.toString() === o2.code?.toString();
  }

  if(o1.code === 'all') {
    return true;
  }

  return null;
};
@AutoUnsubscribe()
@Component({
  selector: 'goeko-select-locations',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    UiSuperSelectModule,
    ReactiveFormsModule,
    SwitchModule
  ],
  providers: [SelectLocationsService],
  templateUrl: './select-locations.component.html',
  styleUrl: './select-locations.component.scss',
})
export class SelectLocationsComponent  implements AfterViewInit{
  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any
  ) => boolean;
  private destroy$ = new Subject<void>();

  public optionAllProvince = { code:  'all', label: 'FORM_LABEL.allProvinces' }
  @Input() controlNameCountry!: string;
  @Input() controlNameProvince!: string;
  @Input()
  public get controlLocations(): FormArray {
    return this._controlLocations;
  }
  public set controlLocations(value: FormArray) {
    this._controlLocations = value;
  }
  private _controlLocations!: FormArray;

  @Input() form!: FormGroup;

  private _selectLocationsService = inject(SelectLocationsService);
  private _selectedCodeLang = this._selectLocationsService.selectedCodeLang;
  public countries = this._selectLocationsService.countries;
  public regions = this._selectLocationsService.regions;
  public toogleEdit = false;
  public newLocation = false;
  public disabledRegions = false;
  public get lastLocations() {
    return this.controlLocations.value?.length -1;
  }
  public get hiddenLocationElement() {
    return this.toogleEdit && this.newLocation
  }
  public get controlCountryCodeByIndex() {
    return (((this.form?.get('locations') as FormGroup)?.controls[this.selectedLocationsIndex()] as FormGroup)?.controls['country'] as FormGroup)?.controls['code'];
  }
  public get controlCountryRegionsByIndex() {
    return (((this.form?.get('locations') as FormGroup)?.controls[this.selectedLocationsIndex()] as FormGroup)?.controls['country'] as FormGroup)?.controls['regions'];
  }

  public dataSourceSelect:Map<string, LocationRegions[]> = new Map();
  public selectedLocationsIndex = signal<number>(0)
  formArraySubscription!: Subscription;
  public isAllRegions(regions: LocationRegions[]) {
    return Array.isArray(regions) ? regions.some(region => region.code === this.optionAllProvince.code) : false;
  }

  public loadRegions(regions: LocationRegions[]) {
    return regions.every(region => region.code);
  }

  constructor() {
    effect(() => {
      this._regionsChangedByIndex();   

    })
  }


  ngAfterViewInit(): void {
    this.subscribeToFormArrayAndItemChanges();

  }

  private subscribeToFormArrayAndItemChanges(): void {
    merge(
      ...this.controlLocations.controls.map((control, index) =>
        control.valueChanges.pipe(
          map(value => ({ index, value })),
          filter(change => change.index >= 0),// only index positive
          distinctUntilChanged((prev, curr) => prev.value.country.code === curr.value.country.code),
          map(change => change.value.country.code.code),// Transforma el cambio en el código de país
          takeUntil(this.destroy$)
        )
      )
    )
    .pipe(
      mergeMap((countryCode ) => this._selectLocationsService.getRegions$(countryCode).pipe(
        map(regiones => ({ countryCode, regiones })) // Mapea las regiones junto con el countryCode
      )),
  
    )
      .subscribe(({ countryCode, regiones }) => {
        this.addRegionsForCodeCountry(countryCode, regiones);
      });
  
  }

  private addRegionsForCodeCountry = ( clave: string, valor: any): void => {
    if (this.dataSourceSelect.has(clave)) {
        this.dataSourceSelect.get(clave)?.push(valor);
    } else {
        this.dataSourceSelect.set(clave, valor);
    }
};
private _regionsChangedByIndex() {
  this.controlCountryRegionsByIndex?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((regions) => { 
    this.disabledRegions = this.isAllRegions(regions);
   })
}

  addLocation(){
    this.controlLocations.push(this._createLocations());
    this.newLocation = true;
    this.toogleEdit = true;
    this.selectedLocationsIndex.set(this.lastLocations);
    this.subscribeToFormArrayAndItemChanges();
    this._regionsChangedByIndex();   

  }

  private _createLocations():FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl('', Validators.required),
        regions: new FormControl<any[]>([''])
      }),
    });
  }
  
  editLocation(location: AbstractControl, index: number): void {
    this.toogleEdit =!this.toogleEdit;
    this.disabledRegions = false;
    this.selectedLocationsIndex.set(index);
  }

  closeForm(){
    this.toogleEdit = false;
    this.controlLocations.removeAt(this.selectedLocationsIndex());
  }

  deleteLocation(index:number):void {
    this.controlLocations.removeAt(index);

  }
  confirmLocation(locationCountryControl: FormGroup | AbstractControl) {
    if(locationCountryControl.get(this.controlNameCountry)?.invalid) {
      return;
    }
    const formControlRegions= locationCountryControl.get(this.controlNameCountry)?.get('regions') as FormControl;
    const codeCountry = locationCountryControl.value.country.code.code;
    const regions = this.dataSourceSelect.get(codeCountry) as LocationRegions[];
    this._setAllRegions(formControlRegions,regions);
    this.toogleEdit = false
  }
  closeFormLocation(index: number) {
    this.deleteLocation(index);
    this.toogleEdit = false
  }


  private _setAllRegions(formControlRegions:  FormControl, regions: LocationRegions[]): void {
    if(!this.isAllRegions(formControlRegions.value)) {
      return;
    }
    formControlRegions.patchValue(regions, {emitEvent: false});

  }
 


  
}
