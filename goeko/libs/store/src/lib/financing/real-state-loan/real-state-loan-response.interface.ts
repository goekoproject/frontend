import { Translations } from '../../admin-categories/classifications-subcategory.model'
import { LocationsCountry } from '../../model/locations.country'
import { ContactRequest } from '../common-request.interface'

export interface RealStateLoanResponse {
  id: string
  bank: Bank
  classifications: ClassificationFunding[]
  locations: LocationsCountry[]
  buildingTypes: string[]
  ownerProfile: string[]
  minimumQuantity: number
  currency: string[]
  contact: ContactRequest
  creationDate: string
}

export interface Bank {
  id: string
  name: string
}

export interface ClassificationFunding {
  category: CategoryFunding
  subcategory: SubcategoryFunding
  products: any[]
}

export interface CategoryFunding {
  id: string
  code: string
  label: {
    translations: Translations[]
  }
}

export interface SubcategoryFunding {
  id: string
  code: string
  label: {
    translations: Translations[]
  }
}
