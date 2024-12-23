import { CommonModule } from '@angular/common'
import { Component, inject, input, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryModule, SelectLocationsComponent, SelectLocationsService } from '@goeko/business-ui'
import { FINANCING_TYPE, FinancingService } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { forkJoin } from 'rxjs'
import { STORE_NAME } from '../funding-token.constants'
import { FundingService } from '../funding.service'
import { CreateRealStateLoan } from './create-real-state-loan.model'
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
    SelectLocationsComponent,
  ],
  providers: [FundingService, FinancingService, { provide: STORE_NAME, useValue: 'real-state-loan' }, SelectLocationsService],
  templateUrl: './real-state-loan-form.component.html',
  styleUrls: ['./real-state-loan-form.component.scss'],
})
export class RealStateLoanComponent implements OnInit {
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  private _selectLocationsService = inject(SelectLocationsService)
  bankId = input.required<string>()

  private _countries = this._selectLocationsService.countries

  public form!: FormGroup

  workTypes = signal<Options[]>(WORKTYPES)
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
  }

  private _buildFrom() {
    this._initForm()
    // this._getRealStateLoanData();
  }

  private _initForm() {
    this.form = this._fb.group({
      workTypes: this._fb.control(null),
      ownerProfile: this._fb.control(this.ownerProfile()[0]),
      buildingTypes: this._fb.control([]),
      locations: this._fb.array([]),
      montanMinimun: this._fb.control(this.amount()[0]),
      currency: this._fb.control(null),
      email: ['', [Validators.email]],
      phoneNumber: ['', Validators.pattern(/^[0-9]{10,15}$/)],
    })
  }

  save = () => {
    const realStateLoan = new CreateRealStateLoan(this.bankId(), this.form.value)
    this._fundingService.setRealStateLoan(realStateLoan)

    const createKindOfFunding$ = forkJoin([
      this._fundingService.createSustainableEquipment(this._fundingService.getSustainableEquipment()),
      this._fundingService.createRealStateLoan(this._fundingService.getRealStateLoan()),
    ])

    createKindOfFunding$.subscribe((res) => {
      console.log(res)
      this._goHubFundings()
    })

    /*    this._fundingService.saveData(realStateLoan).subscribe((res) => {
      console.log(res)
      this._goHubFundings()
    }) */
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

  private _getRealStateLoanData() {
    this._fundingService.getAll(FINANCING_TYPE.RealEstate).subscribe((res: any) => {
      if (res) {
        //mapear el objeto en el formulario
      }
    })
  }
}
