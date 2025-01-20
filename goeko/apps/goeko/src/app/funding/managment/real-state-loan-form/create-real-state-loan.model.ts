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
  balanceSheet: number
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
    this.buildingTypes = dataForm.buildingTypes
    this.ownerProfile = dataForm.ownerProfile
    this.minimumQuantity = dataForm.minimumQuantity
    this.currency = dataForm.currency
    this.balanceSheet = dataForm.balanceSheet
    this.contact = {
      email: dataForm.email,
      //name: dataForm.name,
      name: 'mock',
      phoneNumber: dataForm.phoneNumber,
    }
  }

  private _getOptionLabel = (options: any[]) => {
    return options.map((option) => {
      return option.label
    })
  }
}
