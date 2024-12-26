import { mapperLocations } from '@goeko/core'
import { ClassificationCodeRequest, ContactRequest, LocationsCountry, SustainableEquipmentPayload } from '@goeko/store'

export class CreateSustainableEquipment implements SustainableEquipmentPayload {
  bankId: string
  classifications: ClassificationCodeRequest[]
  locations: LocationsCountry[]
  activityProspectMinimum: number
  balanceSheet?: number | undefined
  requiredDocuments: string[]
  minimumQuantity: number
  currency: string[]
  contact: ContactRequest
  greenBonusVehicles: boolean
  greenBonusMachines: boolean

  constructor(bankId: string, dataForm: any) {
    this.bankId = bankId
    this.classifications = [
      {
        mainCategory: 'co2Emission',
        subCategory: 'mainInternalCombustionEngine',
        products: ['loader','backhoe'],
      }
    ]
    this.locations = mapperLocations(dataForm.locations)
    this.activityProspectMinimum = parseInt(dataForm.yearsActivity.label)
    this.balanceSheet = parseInt(dataForm.yearsBalance.label)
    this.requiredDocuments = dataForm.documents.filter((d: { checked: boolean }) => d.checked).map((doc: { value : {label: string} }) => doc.value.label)
    this.greenBonusVehicles = true; // mock
    this.greenBonusMachines = false; // mock

    this.minimumQuantity = parseInt(dataForm.minimumQuantity)
    this.currency = dataForm.currencys
    this.contact = {
      email: dataForm.email,
      //name: dataForm.name,
      name: 'mock',
      phoneNumber: dataForm.phoneNumber,
    }
  }
}
