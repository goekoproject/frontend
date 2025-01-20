import { mapperLocations } from '@goeko/core'
import { ClassificationCodeRequest, ContactRequest, LocationsCountry, SustainableEquipmentPayload } from '@goeko/store'

export class CreateSustainableEquipment implements SustainableEquipmentPayload {
  bankId: string
  classifications: ClassificationCodeRequest[]
  locations: LocationsCountry[]
  activityProspectMinimum: number
  balanceSheet?: number | undefined
  requiredDocuments: string[] | undefined
  minimumQuantity: number
  currency: string[]
  contact: ContactRequest
  greenBonusVehicles: boolean
  greenBonusMachines: boolean

  constructor(bankId: string, dataForm: any) {
    this.bankId = bankId
    this.classifications = [
      {
        mainCategory: dataForm.vehicles.category,
        subCategory: dataForm.vehicles.subcategory,
        products: dataForm.vehicles.products.map((p: { code: string }) => p.code),
      },
      {
        mainCategory: dataForm.machines.category,
        subCategory: dataForm.machines.subcategory,
        products: dataForm.machines.products.map((p: { code: string }) => p.code),
      },
    ]
    this.locations = mapperLocations(dataForm.locations)
    this.activityProspectMinimum = dataForm.yearsActivity
    this.balanceSheet = dataForm?.yearsBalance
    this.requiredDocuments = this._getDocumentsRequests(dataForm.documents)
    this.greenBonusVehicles = dataForm.greenBonusVehicle
    this.greenBonusMachines = dataForm.greenBonusMachines

    this.minimumQuantity = parseInt(dataForm.minimumQuantity)
    this.currency = dataForm.currencys
    this.contact = {
      email: dataForm.email,
      //name: dataForm.name,
      name: 'mock',
      phoneNumber: dataForm.phoneNumber,
    }
  }

  private _getDocumentsRequests(documents: Array<{ value: { label: string }; checked: boolean }>): string[] | undefined {
    const documentsChecked = documents.filter((d) => d.checked)
    if (documentsChecked.length === 0) {
      return undefined
    }
    return documentsChecked.map((doc: { value: { label: string } }) => doc.value.label)
  }
}
