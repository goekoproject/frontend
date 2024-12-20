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
  constructor(bankId: string, dataForm: any) {
    this.bankId = bankId
    this.classifications = [
      {
        mainCategory: 'mainCategory',
        subCategory: 'subCategory',
        products: ['products'],
      },
      {
        mainCategory: 'mainCategory',
        subCategory: 'subCategory',
        products: ['products'],
      },
    ]
    this.locations = mapperLocations(dataForm.locations)
    this.activityProspectMinimum = dataForm.yearsActivity
    this.balanceSheet = dataForm.yearsBalance
    this.requiredDocuments = dataForm.documents.filter((d: { checked: boolean }) => d.checked).map((doc: { label: string }) => doc.label)
    this.minimumQuantity = dataForm.minimumQuantity
    this.currency = dataForm.currencys
    this.contact = {
      email: dataForm.email,
      name: dataForm.name,
      phoneNumber: dataForm.phoneNumber,
    }
  }
}
