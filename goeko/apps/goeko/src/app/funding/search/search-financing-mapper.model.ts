import { mapperLocations } from '@goeko/core'
import { Classifications, LocationsCountry, SearchRealEstate, SearchSustainableEquipment } from '@goeko/store'

export class SearchSustainableEquipmentMapper implements SearchSustainableEquipment {
  classifications: Classifications[]
  locations: LocationsCountry[]
  activityProspect: number
  balanceSheet: number
  documents: string[]
  quantity: number
  currency: string[]

  constructor(formValue: any) {
    this.classifications = this._mapClassifications(formValue.vehicles, formValue.machines)
    this.locations = mapperLocations(formValue.locations)
    this.activityProspect = parseInt(formValue.yearsActivity)
    this.balanceSheet = parseInt(formValue.yearsBalance)
    this.documents = this._mapDocuments(formValue.documents)
    this.quantity = parseInt(formValue.minimumQuantity)
    this.currency = formValue.currencys
  }

  private _mapClassifications(...classifications: any[]) {
    return classifications.map((classification) => ({
      mainCategory: classification.mainCategory,
      subCategory: classification.subCategory,
      products: [classification.products],
    }))
  }

  private _mapDocuments(documents: Array<{ value: string; checked: boolean }>): string[] {
    return documents.filter((doc) => doc.checked).map((doc) => doc.value)
  }
}

export class RealEstateLoanMapper implements SearchRealEstate {
  classifications?: Classifications[]
  ownerProfile: string[]
  buildingTypes: string[]
  quantity: number
  currency: string[]
  locations: LocationsCountry[]

  constructor(formValue: any) {
    this.classifications = this._mapClassifications(formValue.workTypes)
    this.ownerProfile = formValue.ownerProfile
    this.buildingTypes = formValue.buildingTypes
    this.quantity = parseInt(formValue.montanMinimun)
    this.currency = formValue.currency
    this.locations = mapperLocations(formValue.locations)
  }

  private _mapClassifications(classifications: any) {
    if (!classifications.products || classifications.products.length === 0) {
      return undefined

    }
      return [
        {
          mainCategory: classifications.categoryCode,
          subCategory: classifications.subcategoryCode,
          products: [classifications.products],
        },
      ]
  }
}
