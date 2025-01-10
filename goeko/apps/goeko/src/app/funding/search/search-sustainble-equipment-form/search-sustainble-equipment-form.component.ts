import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { CategoryGrouping, LocationTranslated } from '@goeko/store'
import { ButtonModule, OptionalLabelDirective, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AMOUNT, CURRENCY, DOCUMENTS, YEARS } from '../../data-fields.constants'
type Options = {
  label: string
  id: string
}
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
  templateUrl: './search-sustainble-equipment-form.component.html',
  styleUrl: './search-sustainble-equipment-form.component.scss',
})
export class SearchSustainbleEquipmentFormComponent {
  // Injected  services & providers
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)

  //Data received from the parent component
  categories = input.required<CategoryGrouping[]>()
  vehicles = computed(() => this.categories()[0])
  machines = computed(() => this.categories()[1])

  //Const
  requiredDocuments = signal<Options[]>(DOCUMENTS)
  amount = signal<Options[]>(AMOUNT)
  currencys = signal<Options[]>(CURRENCY)
  years = signal<Options[]>(YEARS)

  // Initialize props
  form!: FormGroup

  // Accessors
  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }
  constructor() {
    effect(() => {
      if (this.vehicles() && this.machines()) {
        this.form = this.formBuilder()
      }
    })
  }

  formBuilder = () =>
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
            value: [doc], // Objeto completo como valor
            checked: [false], // Estado inicial del checkbox
          }),
        ),
      ),
      locations: this._fb.array<LocationTranslated>([], Validators.required),
      minimumQuantity: this._fb.control(this.amount()[0].label),
      currencys: this._fb.control(null),
      yearsActivity: this._fb.control(this.years()[0]),
      yearsBalance: this._fb.control(this.years()[0]),
    })

  goBack = () => {
    window.history.back()
  }
  save = () => {
    console.log(this.form.value)
  }
  goSkip = () => {
    this._goRealStateLoan()
  }

  private _goRealStateLoan = () => {
    this._router.navigate(['real-state-loan'], { relativeTo: this._route.parent })
  }
}
