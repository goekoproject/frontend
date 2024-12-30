import { mapperLocations } from '@goeko/core'
import { ClassificationCodeRequest, ContactRequest, LocationCountry, RealStateLoanPayload } from '@goeko/store'

export class CreateRealStateLoan implements RealStateLoanPayload {
  bankId: string
  classifications: ClassificationCodeRequest[]
  locations: LocationCountry[]
  buildingTypes: string[]
  ownerProfile: string[]
  minimumQuantity: number
  currency: string[]
  contact: ContactRequest

  constructor(bankId: string, dataForm: any) {
    this.bankId = bankId
    this.classifications = [
      {
        mainCategory: dataForm.workTypes.categoryCode,
        subCategory: dataForm.workTypes.subcategoryCode,
        products: dataForm.workTypes.products.map((p: { code: string }) => p.code),
      },
    ]
    this.locations = mapperLocations(dataForm.locations)
    this.buildingTypes = dataForm.buildingTypes.map((buildingType: any) => {
      return buildingType.label
    })
    this.ownerProfile = dataForm.ownerProfile.map((ownerProfile: any) => {
      return ownerProfile.label
    })
    this.minimumQuantity = parseInt(dataForm.montanMinimun.label)
    this.currency = dataForm.currency
    this.contact = {
      email: dataForm.email,
      //name: dataForm.name,
      name: 'mock',
      phoneNumber: dataForm.phoneNumber,
    }
  }
}
