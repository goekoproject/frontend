import { CommonModule } from '@angular/common'
import { Component, signal } from '@angular/core'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { BadgeModule, GoILeavesComponent, ToggleSwitchComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
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
  ],
  templateUrl: './sustainble-equipment-form.component.html',
  styleUrl: './sustainble-equipment-form.component.scss',
})
export class SustainbleEquipmentFormComponent {
  // Constante con los elementos del array.
  vehicles = signal<Options[]>([
    { label: 'all', id: window.crypto.randomUUID() },
    { label: 'vehicles.equipmentTransportTruck', id: window.crypto.randomUUID() },
    { label: 'vehicles.materialTransportTruck', id: window.crypto.randomUUID() },
    { label: 'vehicles.peopleTransportVehicle', id: window.crypto.randomUUID() },
  ])

  machines = signal<Options[]>([
    { label: 'all', id: window.crypto.randomUUID() },
    { label: 'machines.loader', id: window.crypto.randomUUID() },
    { label: 'machines.planer', id: window.crypto.randomUUID() },
    { label: 'machines.excavator', id: window.crypto.randomUUID() },
    { label: 'machines.bucketTruck', id: window.crypto.randomUUID() },
    { label: 'machines.bulldozer', id: window.crypto.randomUUID() },
    { label: 'machines.scraper', id: window.crypto.randomUUID() },
    { label: 'machines.compactor', id: window.crypto.randomUUID() },
    { label: 'machines.dumper', id: window.crypto.randomUUID() },
    { label: 'machines.grader', id: window.crypto.randomUUID() },
    { label: 'machines.trencher', id: window.crypto.randomUUID() },
    { label: 'machines.compressor', id: window.crypto.randomUUID() },
    { label: 'machines.generator', id: window.crypto.randomUUID() },
    { label: 'machines.palletTruck', id: window.crypto.randomUUID() },
  ])

  years = signal<Options[]>([
    {
      label: '1',
      id: window.crypto.randomUUID(),
    },
    {
      label: '2',
      id: window.crypto.randomUUID(),
    },
    {
      label: '3',
      id: window.crypto.randomUUID(),
    },
    {
      label: '4',
      id: window.crypto.randomUUID(),
    },
    {
      label: '5',
      id: window.crypto.randomUUID(),
    },
  ])

  origin = signal<Options[]>([
    { label: 'origin.all', id: window.crypto.randomUUID() },
    { label: 'origin.switzerland', id: window.crypto.randomUUID() },
    { label: 'origin.eu', id: window.crypto.randomUUID() },
    { label: 'origin.america', id: window.crypto.randomUUID() },
    { label: 'origin.asia', id: window.crypto.randomUUID() },
  ])

  documents = signal<Options[]>([
    { label: 'documents.none', id: window.crypto.randomUUID() },
    { label: 'documents.quote', id: window.crypto.randomUUID() },
    { label: 'documents.offer', id: window.crypto.randomUUID() },
    { label: 'documents.proformaInvoice', id: window.crypto.randomUUID() },
  ])

  amount = signal<Options[]>([
    {
      label: '10.000',
      id: window.crypto.randomUUID(),
    },
    {
      label: '15.000',
      id: window.crypto.randomUUID(),
    },
    {
      label: '20.000',
      id: window.crypto.randomUUID(),
    },
    {
      label: '25.000',
      id: window.crypto.randomUUID(),
    },
    {
      label: '30.000',
      id: window.crypto.randomUUID(),
    },
    {
      label: '35.000',
      id: window.crypto.randomUUID(),
    },
    {
      label: '40.000',
      id: window.crypto.randomUUID(),
    },
  ])

  currencys = signal<Options[]>([
    { label: 'CHF', id: window.crypto.randomUUID() },
    { label: 'EUR', id: window.crypto.randomUUID() },
    { label: 'USD', id: window.crypto.randomUUID() },
  ])
}
