import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { CategoryGrouping, LocationTranslated } from '@goeko/store'
import { LeadBankService } from '@goeko/store/lead/bank/lead-bank.service'
import { ButtonModule, OptionalLabelDirective, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AMOUNT, CURRENCY, DOCUMENTS, Options, YEARS } from '../../data-fields.constants'
import { FundingService } from '../../funding.service'
import { SearchSustainableEquipmentMapper } from '../search-financing-mapper.model'

@Component({
  selector: 'goeko-search-sustainble-equipment-form',
  standalone: true,
  imports: [
    CommonModule,
    OptionalLabelDirective,
    RouterModule,
    ButtonModule,
    TranslateModule,
    UiSuperSelectModule,
    ReactiveFormsModule,
    SelectLocationsComponent,
  ],
  providers: [LeadBankService],
  templateUrl: './search-sustainble-equipment-form.component.html',
  styleUrl: './search-sustainble-equipment-form.component.scss',
})
export class SearchSustainbleEquipmentFormComponent {
  // Injected  services & providers
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)

  //Data received from the parent component
  categories = input.required<CategoryGrouping[]>()
  id = input.required<string>()
  vehicles = computed(() => this.categories()[0])
  machines = computed(() => this.categories()[1])

  //Const
  requiredDocuments = signal<Options[]>(DOCUMENTS)
  amount = signal<Options[]>(AMOUNT)
  currencys = signal<Options[]>(CURRENCY)
  years = signal<Options[]>(YEARS)

  // Initialize props
  form!: FormGroup
  checkedBalanceSheet = signal<boolean>(false)

  // Accessors
  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }

  private _goSearchRealStateLoan = () => {
    this._router.navigate(['real-state-loan'], {
      relativeTo: this._route.parent,
      queryParams: { id: this.id() },
      queryParamsHandling: 'merge',
    })
  }
  constructor() {
    effect(() => this._initForm())
  }

  private _initForm = () => {
    if (this.vehicles() && this.machines()) {
      this.form = this._formBuilder()
    }
  }

  private _formBuilder = () =>
    this._fb.group({
      vehicles: this._fb.group({
        mainCategory: [this.vehicles().code],
        subCategory: [this.vehicles().subcategories[0].code],
        products: this._fb.control(null, Validators.required),
      }),
      machines: this._fb.group({
        mainCategory: [this.machines().code],
        subCategory: [this.machines().subcategories[0].code],
        products: this._fb.control(null, Validators.required),
      }),

      documents: this._fb.array(
        this.requiredDocuments().map((doc) =>
          this._fb.group({
            value: [doc.label], // Objeto completo como valor
            checked: [false], // Estado inicial del checkbox
          }),
        ),
      ),
      locations: this._fb.array<LocationTranslated>([], Validators.required),
      minimumQuantity: this._fb.control(this.amount()[0].value),
      currencys: this._fb.control(null),
      yearsActivity: this._fb.control(this.years()[0].label),
      yearsBalance: this._fb.control(this.years()[0].label),
    })

  goBack = () => {
    window.history.back()
  }
  save = () => {
    const searchSustainableEquipment = new SearchSustainableEquipmentMapper(this.form.value)
    this._fundingService.setQuerySustainableEquipment(searchSustainableEquipment)
    this._goSearchRealStateLoan()
  }
  goSkip = () => {
    this._goSearchRealStateLoan()
  }
  changeBalanceSheet = () => {
    this.checkedBalanceSheet.update((checked) => !checked)
  }
}
