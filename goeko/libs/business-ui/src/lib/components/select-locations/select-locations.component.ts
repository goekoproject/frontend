import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoUnsubscribe, UiSuperSelectModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
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
  public selectedLocationsIndex = signal<number |null>(0)
  ngOnInit(): void {
    this.subscribeToFormArrayChanges();
  }

  subscribeToFormArrayChanges() {
    this.controlLocations.controls.forEach((control: any) => {
      this.subscribeToLocationChanges(control);
    });
  }

  // Suscribirse a los cambios de cada FormGroup dentro del FormArray
  subscribeToLocationChanges(location: FormGroup) {
    location
      .get(this.controlNameCountry)
      ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (this._selectedCodeLang() !== value.code) {
          this._selectedCodeLang.set(value.code);
          this._selectLocationsService.getRegions();
        }
      });
  }

  addLocation(){
    this.controlLocations.push(this._createLocations());
    this.newLocation = !this.newLocation;
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

  
}
