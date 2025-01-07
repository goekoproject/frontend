import { CommonModule } from '@angular/common'
import { Component, inject, input, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryModule, SelectLocationsComponent, SelectLocationsService } from '@goeko/business-ui'
import { CategoryGrouping, FinancingService, LocationsCountry, Product, RealStateLoanResponse } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { forkJoin } from 'rxjs'
import { STORE_NAME } from '../funding-token.constants'
import { FundingService } from '../funding.service'
import { CreateRealStateLoan } from './create-real-state-loan.model'
import { AMOUNT, BUILDINGTYPES, CURRENCY, OWNERPROFILES } from './data-fields.constants'

type Options = {
  label: string
  id: string
}
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
  providers: [FundingService, FinancingService, { provide: STORE_NAME, useValue: 'real-state-loan' }, SelectLocationsService],
  templateUrl: './real-state-loan-form.component.html',
  styleUrls: ['./real-state-loan-form.component.scss'],
})
export class RealStateLoanComponent implements OnInit {
  comparteWithProduct = (o1: Product, o2: Product): boolean => o1.id === o2.id
  compareWithOptions = (o1: Options, o2: string): boolean => o1.label === o2
  compareWithOptionsNumber = (o1: Options, o2: string): boolean => +o1.label === +o2

  compareWithOptionsLabel = (o1: string, o2: string): boolean => o1 === o2

  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  private _selectLocationsService = inject(SelectLocationsService)
  bankId = input.required<string>()
  categories = input.required<CategoryGrouping[]>()
  dataRealEstateLoan = input<RealStateLoanResponse>()
  id = input<string>()
  public form!: FormGroup

  amount = signal<Options[]>(AMOUNT)
  currencys = signal<Options[]>(CURRENCY)
  ownerProfile = signal<Options[]>(OWNERPROFILES)
  buildingTypes = signal<Options[]>(BUILDINGTYPES)
  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }

  ngOnInit(): void {
    this._selectLocationsService.setUpCountries()
    this._buildFrom()
    console.log(this.bankId())
    if (this.dataRealEstateLoan()) {
      this._patchFormData(this.dataRealEstateLoan() as RealStateLoanResponse)
      console.log(this.form)
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
      montanMinimun: this._fb.control(this.amount()[0]),
      currency: this._fb.control(null),
      email: ['', [Validators.email]],
      phoneNumber: ['', Validators.pattern(/^[0-9]{10,15}$/)],
    })
  }
  private _setCategoriesAndSubcategories = () => {
    this.form.get('workTypes.categoryCode')?.setValue(this.categories()[0].code)
    this.form.get('workTypes.subcategoryCode')?.setValue(this.categories()[0].subcategories[0].code)
  }

  private _patchFormData(data: RealStateLoanResponse) {
    this.form.patchValue({
      workTypes: {
        categoryCode: data.classifications[0].category.code,
        subcategoryCode: data.classifications[0].subcategory.code,
        products: data.classifications[0].products,
      },
      ownerProfile: data.ownerProfile,
      buildingTypes: data.buildingTypes,
      montanMinimun: data.minimumQuantity,
      currency: data.currency,
      email: data.contact.email,
      phoneNumber: data.contact.phoneNumber,
    })

    data.locations.forEach((location) => {
      this._addLocations(location)
    })
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
  save = () => {
    const realStateLoan = new CreateRealStateLoan(this.bankId(), this.form.value)
    const createKindOfFunding$ = forkJoin([this._updateOrCreateRealStateLoan(realStateLoan)])

    createKindOfFunding$.subscribe((res) => {
      if (res) {
        this._goHubFundings()
      }
    })
  }

  private _updateOrCreateSustainableEquipment = (payload: any) => {
    return this.id()
      ? this._fundingService.updateSustainableEquipment(this.id() as string, payload)
      : this._fundingService.createSustainableEquipment(payload)
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
