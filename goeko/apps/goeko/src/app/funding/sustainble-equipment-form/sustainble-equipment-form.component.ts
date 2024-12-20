import { CommonModule } from '@angular/common'
import { Component, inject, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { SelectLocationsComponent, SelectLocationsService } from '@goeko/business-ui'
import { BadgeModule, ButtonModule, GoILeavesComponent, ToggleSwitchComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { STORE_NAME } from '../funding-token.constants'
import { FundingService } from '../funding.service'
import { AMOUNT, CURRENCY, DOCUMENTS, MACHINES, ORIGIN, VEHICLES, YEARS } from './data-fields.constants'
import { FinancingService } from 'libs/store/src/lib/financing/financing.service'
type Options = {
  label: string
  id: string
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
  ],
  providers: [FundingService, FinancingService, { provide: STORE_NAME, useValue: 'sustainble-equipment' }, SelectLocationsService],
  templateUrl: './sustainble-equipment-form.component.html',
  styleUrl: './sustainble-equipment-form.component.scss',
})
export class SustainbleEquipmentFormComponent implements OnInit {
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  private _selectLocationsService = inject(SelectLocationsService)

  private _countries = this._selectLocationsService.countries
  // Constante con los elementos del array.
  vehicles = signal<Options[]>(VEHICLES)
  machines = signal<Options[]>(MACHINES)
  years = signal<Options[]>(YEARS)
  origin = signal<Options[]>(ORIGIN)
  documents = signal<Options[]>(DOCUMENTS)
  amount = signal<Options[]>(AMOUNT)
  currencys = signal<Options[]>(CURRENCY)

  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }
  form: FormGroup = this._fb.group({
    vehicles: this._fb.control(null),
    greenBonusVehicle: this._fb.control(false),

    machines: this._fb.control(null),
    greenBonusMachines: this._fb.control(false),

    yearsActivity: this._fb.control(this.years()[0]),
    yearsBalance: this._fb.control(this.years()[0]),

    origin: this._fb.control(null),
    documents: this._fb.control(null),
    amount: this._fb.control(this.amount()[0]),
    currencys: this._fb.control(null),
    locations: this._fb.array([]),
  })

  ngOnInit() {
    this._selectLocationsService.setUpCountries()
  }

  toogleGrenBonusVehicle = (newValue: boolean) => {
    this.form.get('greenBonusVehicle')?.setValue(newValue)
  }
  toogleGreenBonusMachine = (newValue: boolean) => {
    this.form.get('greenBonusMachines')?.setValue(newValue)
  }

  save = () => {
    const sustainbleEquipmentValue = {
      ...this.form.value,
      locations: this.form.value.locations.map((location: any) => {
        const country = this._countries()?.find((country) => country.code === location.country.code)

        return {
          country: country,
          ...location.country.regions,
        }
      }),
    }
    this._fundingService.saveData(sustainbleEquipmentValue).subscribe((res: any) => {
      console.log(res)
      this._goRealStateLoan()
    })
  }
  goBack = () => {
    window.history.back()
  }

  goSkip = () => {
    this._goRealStateLoan()
  }

  private _goRealStateLoan = () => {
    this._router.navigate(['./real-state-loan'], { relativeTo: this._route })
  }
}
