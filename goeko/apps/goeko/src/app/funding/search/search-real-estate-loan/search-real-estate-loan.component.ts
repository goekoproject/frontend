import { CommonModule } from '@angular/common'
import { Component, effect, inject, input, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { CategoryGrouping } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, OptionalLabelDirective, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AMOUNT, BUILDINGTYPES, CURRENCY, Options, OWNERPROFILES } from '../../data-fields.constants'
import { FundingService } from '../../funding.service'
import { RealEstateLoanMapper } from '../search-financing-mapper.model'

@Component({
  selector: 'goeko-search-real-estate-loan',
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
    OptionalLabelDirective,
  ],
  templateUrl: './search-real-estate-loan.component.html',
  styleUrl: './search-real-estate-loan.component.scss',
})
export class SearchRealEstateLoanComponent {
  // Injected  services & providers
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)

  //Data received from the parent component
  categories = input.required<CategoryGrouping[]>()

  //Init const
  amount = signal<Options[]>(AMOUNT)
  currencys = signal<Options[]>(CURRENCY)
  ownerProfile = signal<Options[]>(OWNERPROFILES)
  buildingTypes = signal<Options[]>(BUILDINGTYPES)
  //Init props
  form!: FormGroup

  // Accessors
  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }
  constructor() {
    effect(() => this._initForm())
  }

  private _initForm = () => {
    if (this.categories()) {
      this.form = this._formBuilder()
    }
  }
  private _formBuilder = () =>
    this._fb.group({
      workTypes: this._fb.group({
        categoryCode: [this.categories()[0].code],
        subcategoryCode: [this.categories()[0].subcategories[0].code],
        products: ['', Validators.required],
      }),
      ownerProfile: ['', Validators.required],
      buildingTypes: ['', Validators.required],
      locations: this._fb.array([]),
      montanMinimun: [this.amount()[0].value, Validators.required],
      currency: ['', Validators.required],
    })

  search = () => {
    if (this.form.valid) {
      const searchRealEstateLoan = new RealEstateLoanMapper(this.form.value)
      this._fundingService.setQueryRealEstateLoan(searchRealEstateLoan)
    }
    this._router.navigate(['search-results'], { relativeTo: this._route.parent })
  }
  goBack = () => {
    window.history.back()
  }
}
