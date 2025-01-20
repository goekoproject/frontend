import { CommonModule } from '@angular/common'
import { Component, effect, inject, input, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectLocationsComponent, SelectLocationsService } from '@goeko/business-ui'
import { CategoryGrouping, FinancingService, LocationsCountry, Product, RealEstateLoanResponse } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { forkJoin } from 'rxjs'
import { AMOUNT_BANK, BUILDINGTYPES, CURRENCY, Options, OWNERPROFILES, YEARS } from '../../data-fields.constants'
import { FundingService } from '../../funding.service'
import { CreateRealStateLoan } from './create-real-state-loan.model'

@Component({
  selector: 'goeko-real-state-loan-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule,
    BadgeModule,
    ReactiveFormsModule,
    GoInputModule,
    UiSuperSelectModule,
    SelectLocationsComponent,
  ],
  providers: [FundingService, FinancingService, SelectLocationsService],
  templateUrl: './real-state-loan-form.component.html',
  styleUrls: ['./real-state-loan-form.component.scss'],
})
export class RealStateLoanComponent implements OnInit {
  comparteWithProduct = (o1: Product, o2: Product): boolean => o1.id === o2.id

  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  private _selectLocationsService = inject(SelectLocationsService)
  bankId = input.required<string>()
  categories = input.required<CategoryGrouping[]>()
  dataRealEstateLoan = input<RealEstateLoanResponse>()
  id = input<string>()
  public form!: FormGroup

  amount = signal<Options[]>(AMOUNT_BANK)
  currencys = signal<Options[]>(CURRENCY)
  ownerProfile = signal<Options[]>(OWNERPROFILES)
  buildingTypes = signal<Options[]>(BUILDINGTYPES)
  years = signal<Options[]>(YEARS)
  checkedBalanceSheet = signal<boolean>(false)

  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }

  constructor() {
    effect(() => this._manageBalanceSheet())
  }
  ngOnInit(): void {
    this._selectLocationsService.setUpCountries()
    this._buildFrom()
    if (this.dataRealEstateLoan()) {
      this._patchFormData(this.dataRealEstateLoan() as RealEstateLoanResponse)
    }
  }

  private _buildFrom() {
    this._initForm()
    this._setCategoriesAndSubcategories()
  }

  private _initForm() {
    this.form = this._fb.group({
      workTypes: this._fb.group({
        categoryCode: this._fb.control(null),
        subcategoryCode: this._fb.control(null),
        products: this._fb.control([]),
      }),
      ownerProfile: this._fb.control(this.ownerProfile()[0]),
      buildingTypes: this._fb.control([]),
      locations: this._fb.array([]),
      minimumQuantity: this._fb.control(this.amount()[0].value),
      balanceSheet: this._fb.control(this.years()[0].label),
      currency: this._fb.control(null),
      email: ['', [Validators.email]],
      phoneNumber: ['', Validators.pattern(/^[0-9]{10,15}$/)],
    })
  }
  private _setCategoriesAndSubcategories = () => {
    this.form.get('workTypes.categoryCode')?.setValue(this.categories()[0].code)
    this.form.get('workTypes.subcategoryCode')?.setValue(this.categories()[0].subcategories[0].code)
  }

  private _patchFormData(data: RealEstateLoanResponse) {
    this.form.patchValue({
      workTypes: {
        categoryCode: data.classifications[0].category.code,
        subcategoryCode: data.classifications[0].subcategory.code,
        products: data.classifications[0].products,
      },
      ownerProfile: data.ownerProfile,
      buildingTypes: data.buildingTypes,
      minimumQuantity: data.minimumQuantity,
      balanceSheet: data.balanceSheet,
      currency: data.currency,
      email: data.contact.email,
      phoneNumber: data.contact.phoneNumber,
    })

    data.locations.forEach((location) => {
      this._addLocations(location)
    })
    this.checkedBalanceSheet.update(() => !!data.balanceSheet)
  }

  private _addLocations(location: LocationsCountry) {
    this.locationsArrays.push(this._createLocations(location))
  }
  private _createLocations(location: LocationsCountry): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(location.country.code),
        regions: new FormControl(location.country.regions),
      }),
    })
  }

  private _manageBalanceSheet = () => {
    if (this.checkedBalanceSheet()) {
      this.form.get('yearsBalance')?.setValidators([Validators.required])
    } else {
      this.form.get('yearsBalance')?.clearValidators()
      this.form.get('yearsBalance')?.reset()
    }
  }

  changeBalanceSheet = () => {
    this.checkedBalanceSheet.update((checked) => !checked)
  }
  save = () => {
    const realStateLoan = new CreateRealStateLoan(this.bankId(), this.form.value)
    const createKindOfFunding$ = forkJoin([this._updateOrCreateRealStateLoan(realStateLoan)])

    createKindOfFunding$.subscribe((res) => {
      if (res) {
        this._goHubFundings()
      }
    })
  }

  private _updateOrCreateRealStateLoan = (payload: CreateRealStateLoan) => {
    return this.id()
      ? this._fundingService.updateRealStateLoan(this.id() as string, payload)
      : this._fundingService.createRealStateLoan(payload)
  }
  goBack = () => {
    window.history.back()
  }

  goSkip = () => {
    this._goHubFundings()
  }

  private _goHubFundings = () => {
    this._router.navigate([`../funding/${this.bankId()}`], { relativeTo: this._route.parent?.parent })
  }
}
