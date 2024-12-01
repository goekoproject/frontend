import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { BadgeModule, ButtonModule, GoILeavesComponent, ToggleSwitchComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AMOUNT, CURRENCY, DOCUMENTS, MACHINES, ORIGIN, VEHICLES, YEARS } from './data-fields.constants'
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
  templateUrl: './sustainble-equipment-form.component.html',
  styleUrl: './sustainble-equipment-form.component.scss',
})
export class SustainbleEquipmentFormComponent {
  private _fb = inject(FormBuilder)
  private _router = inject(Router)

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

    years: this._fb.control(null),
    origin: this._fb.control(null),
    documents: this._fb.control(null),
    amount: this._fb.control(null),
    currencys: this._fb.control(null),
    locations: this._fb.array([]),
  })

  save = () => {
    console.log(this.form.value)
    this._router.navigate(['./real-state-loan'])
  }
}
