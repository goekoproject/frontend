import { CommonModule } from '@angular/common'
import { Component, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoryModule, SelectLocationsComponent } from '@goeko/business-ui'
import { DataSelect } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { defaultSetCurrency } from './compare-with-select'
import { Validators } from '@angular/forms'
import { AMOUNT, BUILDINGTYPES, CURRENCY, OWNERPROFILES, WORKTYPES } from './data-fields.constants'
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
    SelectLocationsComponent
  ],
  templateUrl: './real-state-loan-form.component.html',
  styleUrls: ['./real-state-loan-form.component.scss'],
})
export class RealStateLoanComponent implements OnInit {

  public defaultSetCurrency = defaultSetCurrency
  public form!: FormGroup

  workTypes = signal<Options[]>(WORKTYPES)
  buildingTypes = signal<Options[]>(BUILDINGTYPES)
  ownerProfiles = signal<Options[]>(OWNERPROFILES)
  amount = signal<Options[]>(AMOUNT)
  currencys = signal<Options[]>(CURRENCY)

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
      workTypes: this._fb.control(null),
      buildingTypes: this._fb.control(null),
      ownerProfiles: this._fb.control(null),
      locations: this._fb.array([]),
      currency: ['', Validators.required],
      montanMinimun: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', Validators.pattern(/^[0-9]{10,15}$/)],
    })

  }

  private _initMockValues() {
    // this.workTypes = MOCK_WORKTYPES
    // this.buildingTypes = MOCK_BUILDINGTYPES
    // this.ownerProfiles = MOCK_OWNER_PROFILES
  }

}
