export type Options = {
  label: string
  id: string
  value?: number
}
export const VEHICLES = [
  { label: 'all', id: window.crypto.randomUUID() },
  { label: 'vehicles.equipmentTransportTruck', id: window.crypto.randomUUID() },
  { label: 'vehicles.materialTransportTruck', id: window.crypto.randomUUID() },
  { label: 'vehicles.peopleTransportVehicle', id: window.crypto.randomUUID() },
]
export const MACHINES = [
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
]
export const YEARS = [
  {
    label: '0',
    id: window.crypto.randomUUID(),
  },
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
    label: '5+',
    id: window.crypto.randomUUID(),
  },
]
/*export const ORIGIN = [
  { label: 'origin.all', id: window.crypto.randomUUID() },
  { label: 'origin.switzerland', id: window.crypto.randomUUID() },
  { label: 'origin.eu', id: window.crypto.randomUUID() },
  { label: 'origin.america', id: window.crypto.randomUUID() },
  { label: 'origin.asia', id: window.crypto.randomUUID() },
]*/
export const DOCUMENTS = [
  /*   { label: 'documents.none', id: window.crypto.randomUUID() },
   */ { label: 'documents.quote', id: window.crypto.randomUUID() },
  { label: 'documents.offer', id: window.crypto.randomUUID() },
  { label: 'documents.proformaInvoice', id: window.crypto.randomUUID() },
]

export const CURRENCY = [
  { label: 'CHF', id: window.crypto.randomUUID() },
  { label: 'EUR', id: window.crypto.randomUUID() },
  { label: 'USD', id: window.crypto.randomUUID() },
]

export const AMOUNT = [
  {
    label: '10.000',
    value: 10000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '15.000',
    value: 15000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '20.000',
    value: 20000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '25.000',
    value: 25000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '30.000',
    value: 30000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '35000',
    value: 35000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '> 35.000',
    value: 36000,
    id: window.crypto.randomUUID(),
  },
]

export const AMOUNT_BANK = [
  {
    label: '10000',
    value: 10000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '15000',
    value: 15000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '20000',
    value: 20000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '25000',
    value: 25000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '30000',
    value: 30000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '35000',
    value: 35000,
    id: window.crypto.randomUUID(),
  },
  {
    label: '40000',
    value: 40000,
    id: window.crypto.randomUUID(),
  },
]
export const WORKTYPES = [
  { label: 'all', id: window.crypto.randomUUID() },
  { label: 'worktypes.atticInsulation', id: window.crypto.randomUUID() },
  { label: 'worktypes.wallInsulation', id: window.crypto.randomUUID() },
  { label: 'worktypes.floorInsulation', id: window.crypto.randomUUID() },
  { label: 'worktypes.installationHeatPump', id: window.crypto.randomUUID() },
  { label: 'worktypes.replacementWindows', id: window.crypto.randomUUID() },
  { label: 'worktypes.installationShuttersSolarProtection', id: window.crypto.randomUUID() },
  { label: 'worktypes.replacementBoiler', id: window.crypto.randomUUID() },
  { label: 'worktypes.solarThermalPanels', id: window.crypto.randomUUID() },
  { label: 'worktypes.woodBiomassBoiler', id: window.crypto.randomUUID() },
  { label: 'worktypes.lowenergyLighting', id: window.crypto.randomUUID() },
  { label: 'worktypes.thermodynamicSolarWaterHeater', id: window.crypto.randomUUID() },
  { label: 'worktypes.installationDualflowVentilation', id: window.crypto.randomUUID() },
  { label: 'worktypes.homeAutomationSystems', id: window.crypto.randomUUID() },
]
export const BUILDINGTYPES = [
  { label: 'buildingtypes.residential', id: window.crypto.randomUUID() },
  { label: 'buildingtypes.mixed-use', id: window.crypto.randomUUID() },
  { label: 'buildingtypes.commercial', id: window.crypto.randomUUID() },
]

export const OWNERPROFILES = [
  { label: 'ownerprofiles.individual', id: window.crypto.randomUUID() },
  { label: 'ownerprofiles.PPE', id: window.crypto.randomUUID() },
  { label: 'ownerprofiles.realEstateCompany', id: window.crypto.randomUUID() },
  { label: 'ownerprofiles.housingCooperative', id: window.crypto.randomUUID() },
]
