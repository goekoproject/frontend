import { LocationsCountry } from './../../../../../../libs/store/src/lib/model/locations.country';
import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoryModule, SelectLocationsComponent } from '@goeko/business-ui'
import { Country, DataSelect, Product } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { Validators } from 'ngx-editor'
import { defaultSetCurrency } from './compare-with-select'
import { MOCK_WORKTYPES, MOCK_BUILDINGTYPES, MOCK_OWNER_PROFILES } from './mock-values.constant';


@Component({
  selector: 'goeko-real-state-loan-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule,
    CategoryModule,
    BadgeModule,
    ReactiveFormsModule,
    GoInputModule,
    UiSuperSelectModule,
    SelectLocationsComponent
  ],
  templateUrl: './real-state-loan-form.component.html',
  styleUrls: ['./real-state-loan-form.component.scss'],
})
export class RealStateLoanComponent implements OnInit {

  public defaultSetCurrency = defaultSetCurrency
  public dataSelect = DataSelect
  public form!: FormGroup
  public workTypes!: Product[]
  public buildingTypes!: Product[]
  public ownerProfiles!: Product[]

  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }

  constructor(
    private _fb: FormBuilder,
  ) {
  }


  ngOnInit(): void {
    this._initMockValues();
    this._buildFrom()
  }

  private _buildFrom() {
    this._initForm()
  }

  private _initForm() {
    this.form = this._fb.group({
      workTypes: ['', Validators.required],
      buildingTypes: ['', Validators.required],
      ownerProfile: ['', Validators.required],
      locations: this._fb.array([]),
      currency: ['', Validators.required],
      montanMinimun: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    })

  }

  private _initMockValues() {
    this.workTypes = MOCK_WORKTYPES
    this.buildingTypes = MOCK_BUILDINGTYPES
    this.ownerProfiles = MOCK_OWNER_PROFILES
  }

}
