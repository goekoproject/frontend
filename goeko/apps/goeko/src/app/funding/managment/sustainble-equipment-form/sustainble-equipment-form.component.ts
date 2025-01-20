import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { SelectLocationsComponent, SelectLocationsService } from '@goeko/business-ui'
import {
  CategoryGrouping,
  ClassificationsService,
  FinancingService,
  LocationsCountry,
  LocationTranslated,
  Product,
  SustainableEquipmentResponse,
} from '@goeko/store'
import { BadgeModule, ButtonModule, GoILeavesComponent, GoInputModule, ToggleSwitchComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AMOUNT_BANK, CURRENCY, DOCUMENTS, YEARS } from '../../data-fields.constants'
import { STORE_NAME } from '../../funding-token.constants'
import { FundingService } from '../../funding.service'
import { CreateSustainableEquipment } from './create-sustainable-equipment.model'
type Options = {
  label: string
  id: string
  value?: number
}

@Component({
  selector: 'goeko-sustainble-equipment-form',
  standalone: true,
  imports: [
    CommonModule,
    BadgeModule,
    TranslateModule,
    ToggleSwitchComponent,
    GoILeavesComponent,
    UiSuperSelectModule,
    SelectLocationsComponent,
    ButtonModule,
    RouterModule,
    ReactiveFormsModule,
    GoInputModule,
  ],
  providers: [
    FundingService,
    FinancingService,
    ClassificationsService,
    { provide: STORE_NAME, useValue: 'sustainble-equipment' },
    SelectLocationsService,
  ],
  templateUrl: './sustainble-equipment-form.component.html',
  styleUrl: './sustainble-equipment-form.component.scss',
})
export class SustainbleEquipmentFormComponent implements OnInit {
  comparteWithProduct = (o1: Product, o2: Product): boolean => o1.id === o2.id

  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  private _selectLocationsService = inject(SelectLocationsService)
  categories = input.required<CategoryGrouping[]>()
  bankId = input.required<string>()
  id = input<string>()
  isNew = input<boolean>()
  dataRealEstateLoan = input<SustainableEquipmentResponse>()
  vehicles = computed(() => this.categories()[0])
  machines = computed(() => this.categories()[1])
  years = signal<Options[]>(YEARS)
  requiredDocuments = signal<Options[]>(DOCUMENTS)
  amount = signal<Options[]>(AMOUNT_BANK)
  currencys = signal<Options[]>(CURRENCY)
  //origin = signal<Options[]>(ORIGIN)
  checkedBalanceSheet = signal<boolean>(false)

  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }

  private _goRealStateLoan = () => {
    this._router.navigate(['real-state-loan', this.bankId()], { relativeTo: this._route.parent })
  }
  form: FormGroup = this._fb.group({
    vehicles: this._fb.group({
      category: this._fb.control(null),
      subcategory: this._fb.control(null),
      products: this._fb.control(null),
    }),
    greenBonusVehicle: this._fb.control(false),

    machines: this._fb.group({
      category: this._fb.control(null),
      subcategory: this._fb.control(null),
      products: this._fb.control(null),
    }),
    greenBonusMachines: this._fb.control(false),

    yearsActivity: this._fb.control(this.years()[0]),
    yearsBalance: this._fb.control(this.years()[0]),

    documents: this._fb.array(
      this.requiredDocuments().map((doc) =>
        this._fb.group({
          value: [doc], // Objeto completo como valor
          checked: [false], // Estado inicial del checkbox
        }),
      ),
    ),
    minimumQuantity: this._fb.control(this.amount()[0].value),
    currencys: this._fb.control(null),
    locations: this._fb.array<LocationTranslated>([]),
    name: this._fb.control(null),
    email: this._fb.control(null, Validators.email),
    phoneNumber: this._fb.control(null),

    //origin: this._fb.control(null),
  })

  documentsFormArray = this.form.get('documents') as FormArray<FormControl>

  constructor() {
    effect(() => this._manageBalanceSheet())
  }
  ngOnInit() {
    this._selectLocationsService.setUpCountries()
    this._setCategoriesAndSubcategories()
    if (this.dataRealEstateLoan()) {
      this._patchFormData(this.dataRealEstateLoan() as SustainableEquipmentResponse)
    }
  }

  private _setCategoriesAndSubcategories = () => {
    this.form.get('vehicles.category')?.setValue(this.vehicles().code)
    this.form.get('vehicles.subcategory')?.setValue(this.vehicles().subcategories[0].code)
    this.form.get('machines.category')?.setValue(this.machines().code)
    this.form.get('machines.subcategory')?.setValue(this.machines().subcategories[0].code)
  }

  private _patchFormData(data: SustainableEquipmentResponse) {
    this.form.patchValue({
      vehicles: {
        category: data.classifications[0].category.code,
        subcategory: data.classifications[0].subcategory.code,
        products: data.classifications[0].products,
      },
      greenBonusVehicle: data.greenBonusVehicles,
      machines: {
        category: data.classifications[1]?.category.code,
        subcategory: data.classifications[1]?.subcategory.code,
        products: data.classifications[1]?.products,
      },
      greenBonusMachines: data.greenBonusMachines,
      yearsActivity: data.activityProspectMinimum,
      yearsBalance: data.balanceSheet,
      minimumQuantity: data.minimumQuantity,
      currencys: data.currency,

      name: data.contact.name,
      email: data.contact.email,
      phoneNumber: data.contact.phoneNumber,
    })

    this.documentsFormArray.controls.forEach((control) => {
      if (data.requiredDocuments.includes(control.value.value.label)) {
        control.get('checked')?.setValue(true)
      }
    })

    data.locations.forEach((location) => {
      this._addLocations(location)
    })
    this.checkedBalanceSheet.update(() => !!data.balanceSheet)
  }

  private _manageBalanceSheet = () => {
    if (this.checkedBalanceSheet()) {
      this.form.get('yearsBalance')?.setValidators([Validators.required])
    } else {
      this.form.get('yearsBalance')?.clearValidators()
      this.form.get('yearsBalance')?.reset()
    }
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

  toogleGrenBonusVehicle = (newValue: boolean | undefined) => {
    this.form.get('greenBonusVehicle')?.setValue(newValue)
  }
  toogleGreenBonusMachine = (newValue: boolean | undefined) => {
    this.form.get('greenBonusMachines')?.setValue(newValue)
  }

  save = () => {
    const sustainbleEquipmentValue = new CreateSustainableEquipment(this.bankId(), this.form.value)
    this._updateOrCreateSustainableEquipment(sustainbleEquipmentValue).subscribe(() => {
      if (this.isNew()) {
        this._goRealStateLoan()
      } else {
        this.goBack()
      }
    })
  }

  private _updateOrCreateSustainableEquipment = (payload: CreateSustainableEquipment) => {
    return this.id()
      ? this._fundingService.updateSustainableEquipment(this.id() as string, payload)
      : this._fundingService.createSustainableEquipment(payload)
  }

  goBack = () => {
    window.history.back()
  }

  goSkip = () => {
    this._goRealStateLoan()
  }

  changeBalanceSheet = () => {
    this.checkedBalanceSheet.update((checked) => !checked)
  }
}
