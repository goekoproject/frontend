import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryModule, SelectLocationsComponent, SelectLocationsService } from '@goeko/business-ui'
import { DataSelect, Product } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { STORE_NAME } from '../funding-token.constants'
import { FundingService } from '../funding.service'
import { defaultSetCurrency } from './compare-with-select'
import { MOCK_BUILDINGTYPES, MOCK_OWNER_PROFILES, MOCK_WORKTYPES } from './mock-values.constant'

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
    SelectLocationsComponent,
  ],
  providers: [FundingService, { provide: STORE_NAME, useValue: 'real-state-loan' }, SelectLocationsService],
  templateUrl: './real-state-loan-form.component.html',
  styleUrls: ['./real-state-loan-form.component.scss'],
})
export class RealStateLoanComponent implements OnInit {
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  private _selectLocationsService = inject(SelectLocationsService)

  private _countries = this._selectLocationsService.countries

  public defaultSetCurrency = defaultSetCurrency
  public dataSelect = DataSelect
  public form!: FormGroup
  public workTypes!: Product[]
  public buildingTypes!: Product[]
  public ownerProfiles!: Product[]

  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }

  ngOnInit(): void {
    this._selectLocationsService.setUpCountries()
    this._initMockValues()
    this._buildFrom()
  }

  private _buildFrom() {
    this._initForm()
  }

  private _initForm() {
    this.form = this._fb.group({
      workTypes: [''],
      buildingTypes: [''],
      ownerProfiles: [''],
      locations: this._fb.array([]),
      currency: ['', Validators.required],
      montanMinimun: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', Validators.pattern(/^[0-9]{10,15}$/)],
    })
  }

  private _initMockValues() {
    this.workTypes = MOCK_WORKTYPES
    this.buildingTypes = MOCK_BUILDINGTYPES
    this.ownerProfiles = MOCK_OWNER_PROFILES
  }

  save = () => {
    const realStateLoan = {
      ...this.form.value,
      locations: this.form.value.locations.map((location: any) => {
        const country = this._countries()?.find((country) => country.code === location.country.code)
        return {
          country: country,
          ...location.country.regions,
        }
      }),
    }
    this._fundingService.saveData(realStateLoan).subscribe((res) => {
      console.log(res)
      this._goHubFundings()
    })
  }
  goBack = () => {
    window.history.back()
  }

  goSkip = () => {
    this._goHubFundings()
  }

  private _goHubFundings = () => {
    this._router.navigate(['../funding'], { relativeTo: this._route.parent?.parent })
  }
}
