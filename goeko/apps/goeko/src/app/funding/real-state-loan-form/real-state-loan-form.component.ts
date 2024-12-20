import { CommonModule } from '@angular/common'
import { Component, inject, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryModule, SelectLocationsComponent, SelectLocationsService } from '@goeko/business-ui'
import { BadgeModule, ButtonModule, GoInputModule, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { STORE_NAME } from '../funding-token.constants'
import { FundingService } from '../funding.service'
import { defaultSetCurrency } from './compare-with-select'
import { AMOUNT, BUILDINGTYPES, CURRENCY, OWNERPROFILES, WORKTYPES } from './data-fields.constants'
import { FinancingService } from 'libs/store/src/lib/financing/financing.service'
import { RealStateLoanPayload } from 'libs/store/src/lib/financing/real-state-loan.model'

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
  providers: [FundingService,FinancingService , { provide: STORE_NAME, useValue: 'real-state-loan' }, SelectLocationsService],
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
  public form!: FormGroup

  workTypes = signal<Options[]>(WORKTYPES)
  amount = signal<Options[]>(AMOUNT)
  currencys = signal<Options[]>(CURRENCY)
  ownerProfile = signal<Options[]>(OWNERPROFILES)
  buildingTypes = signal<Options[]>(BUILDINGTYPES)
  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }

    // private _refresh$ = new BehaviorSubject<void>(undefined)

    // realStateLoanData$ = this._refresh$.pipe(
    //   switchMap(() => this._fundingService.getAllDataFromStore('real-state-loan')),
    //   map((data) => data[0]),
    // )



  ngOnInit(): void {
    this._selectLocationsService.setUpCountries()
    this._buildFrom()
    // this._refresh$.next()
    // this.realStateLoanData$.subscribe(res => {
    //   console.log(res);
    // });
  }

  private _buildFrom() {
    this._initForm()
  }

  private _initForm() {
    this.form = this._fb.group({
      workTypes: this._fb.control(null),
      ownerProfile: this._fb.control(this.ownerProfile()[0]),
      buildingTypes: this._fb.control(this.buildingTypes()[0]),
      locations: this._fb.array([]),
      montanMinimun: this._fb.control(this.amount()[0]),
      currency: this._fb.control(null),
      email: ['', [Validators.email]],
      phoneNumber: ['', Validators.pattern(/^[0-9]{10,15}$/)],
    })
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

    this._fundingService.saveRealStateLoan(this._buildRealStateLoanPayload(this.form.value));

  }

  private _buildRealStateLoanPayload(realStateLoanFormValue: any): RealStateLoanPayload {


    const workTypesProducts = realStateLoanFormValue.workTypes.map((worktype: any) => {
      return worktype.label
    })

    const workTypes = [{
      mainCategory: 'Building founding',
      subCategory: 'Work types',
      products: workTypesProducts
    }];

    const buildingTypesList = [];
    buildingTypesList.push(realStateLoanFormValue.buildingTypes.label);

    const ownerProfileList = [];
    ownerProfileList.push(realStateLoanFormValue.ownerProfile.label);

    const currencyList = [];
    currencyList.push(realStateLoanFormValue.currency);

    return {
      bankId: "1",
      classifications: workTypes,
      locations: realStateLoanFormValue.locations.map((location: any) => {
        const country = this._countries()?.find((country) => country.code === location.country.code)
        return {
          country: country,
          ...location.country.regions,
        }
      }),
      buildingTypes: buildingTypesList,
      ownerProfile: ownerProfileList,
      minimumQuantity: parseInt(realStateLoanFormValue.montanMinimun.label),
      currency: currencyList,
      contact: {
        name: "prueba",
        email: realStateLoanFormValue.email,
        phoneNumber: realStateLoanFormValue.phoneNumber,
      }
    }
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
