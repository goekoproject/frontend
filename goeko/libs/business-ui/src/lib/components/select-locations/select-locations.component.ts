import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoUnsubscribe, UiSuperSelectModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { SelectLocationsService } from './select-locations.service';

const defaultSetSuperSelect = (o1: any, o2: any) => {
  if (o1 && o2 && typeof o2 !== 'object') {
    return o1.code.toString() === o2;
  }

  if (o1 && o2 && typeof o2 === 'object') {
    return o1.code?.toString() === o2.code?.toString();
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
  ],
  providers: [SelectLocationsService],
  templateUrl: './select-locations.component.html',
  styleUrl: './select-locations.component.scss',
})
export class SelectLocationsComponent implements OnInit {
  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any
  ) => boolean;
  private destroy$ = new Subject<void>();

  @Input() controlNameCountry!: string;
  @Input() controlNameProvince!: string;
  @Input() controlLocations!: FormArray;

  @Input() form!: FormGroup;

  private _selectLocationsService = inject(SelectLocationsService);
  private _selectedCodeLang = this._selectLocationsService.selectedCodeLang;
  public countries = this._selectLocationsService.countries;
  public regions = this._selectLocationsService.regions;
  public toogleEdit = false;
  public newLocation = false;

  public get lastLocations() {
    return this.controlLocations.value?.length -1;
  }
  public get hiddenLocationElement() {
    return this.toogleEdit && this.newLocation
  }
  public get controlCountryCode() {
    return (((this.form?.get('locations') as FormGroup)?.controls[this.selectedLocationsIndex()] as FormGroup)?.controls['country'] as FormGroup)?.controls['code'];
  }
  public selectedLocationsIndex = signal<number>(0)
  ngOnInit(): void {
  }


  // Suscribirse a los cambios de cada FormGroup dentro del FormArray
 onCodeChange(country:{code: string, label: string}) {
    this._getRegionsForCodeCountry(country.code);
 
  }

  private _getRegionsForCodeCountry(code:string) {
    this._selectedCodeLang.set(code)
    this._selectLocationsService.getRegions();
  }

  addLocation(){
    this.controlLocations.push(this._createLocations());
    this.newLocation = true;
    this.toogleEdit = true;
    this.selectedLocationsIndex.set(this.lastLocations);
  }

  private _createLocations():FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl('', Validators.required),
        regions: new FormControl('', Validators.required)
      }),
    });
  }
  editLocation(location: AbstractControl, index: number): void {
    this.toogleEdit =!this.toogleEdit;
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
    this.toogleEdit = false
  }
  closeFormLocation(index: number) {
    this.deleteLocation(index);
    this.toogleEdit = false

  }
  
}
