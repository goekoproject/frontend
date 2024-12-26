import { CommonModule } from '@angular/common'
import { Component, inject, input, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { SelectLocationsComponent, SelectLocationsService } from '@goeko/business-ui'
import { LocationTranslated } from '@goeko/store'
import { BadgeModule, ButtonModule, GoILeavesComponent, GoInputModule, ToggleSwitchComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { STORE_NAME } from '../funding-token.constants'
import { FundingService } from '../funding.service'
import { CreateSustainableEquipment } from './create-sustainable-equipment.model'
import { AMOUNT, CURRENCY, DOCUMENTS, MACHINES, VEHICLES, YEARS } from './data-fields.constants'
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
    GoInputModule,
  ],
  providers: [FundingService, { provide: STORE_NAME, useValue: 'sustainble-equipment' }, SelectLocationsService],
  templateUrl: './sustainble-equipment-form.component.html',
  styleUrl: './sustainble-equipment-form.component.scss',
})
export class SustainbleEquipmentFormComponent implements OnInit {
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fundingService = inject(FundingService)
  private _selectLocationsService = inject(SelectLocationsService)

  bankId = input.required<string>()
  vehicles = signal<Options[]>(VEHICLES)
  machines = signal<Options[]>(MACHINES)
  years = signal<Options[]>(YEARS)
  requiredDocuments = signal<Options[]>(DOCUMENTS)
  amount = signal<Options[]>(AMOUNT)
  currencys = signal<Options[]>(CURRENCY)
  //origin = signal<Options[]>(ORIGIN)

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

    documents: this._fb.array(
      this.requiredDocuments().map((doc) =>
        this._fb.group({
          value: [doc], // Objeto completo como valor
          checked: [false], // Estado inicial del checkbox
        }),
      ),
    ),
    minimumQuantity: this._fb.control(this.amount()[0].label),
    currencys: this._fb.control(null),
    locations: this._fb.array<LocationTranslated>([]),
    name: this._fb.control(null),
    email: this._fb.control(null, Validators.email),
    phoneNumber: this._fb.control(null),

    //origin: this._fb.control(null),
  })

  documentsFormArray = this.form.get('documents') as FormArray<FormControl>

  ngOnInit() {
    this._selectLocationsService.setUpCountries()
    console.log(this.bankId())
  }

  toogleGrenBonusVehicle = (newValue: boolean | undefined) => {
    this.form.get('greenBonusVehicle')?.setValue(newValue)
  }
  toogleGreenBonusMachine = (newValue: boolean | undefined) => {
    this.form.get('greenBonusMachines')?.setValue(newValue)
  }

  save = () => {
    const sustainbleEquipmentValue = new CreateSustainableEquipment(this.bankId(), this.form.value)
    console.log(sustainbleEquipmentValue)

    this._fundingService.saveData(sustainbleEquipmentValue).subscribe((res: any) => {
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
