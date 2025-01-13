import { Classifications } from '../model/classifications.interface'
import { LocationsCountry } from '../model/locations.country'

export interface SearchSustainableEquipment {
  classifications: Classifications[]
  locations: LocationsCountry[]
  activityProspect: number
  balanceSheet: number
  documents: string[]
  quantity: number
  currency: string[]
}

export interface SearchRealEstate {
  classifications?: Classifications[]
  locations: LocationsCountry[]
  buildingTypes: string[]
  ownerProfile: string[]
  quantity: number
  currency: string[]
}
export interface SearchFinacing {
  sustainableEquipment: SearchSustainableEquipment
  realEstate: SearchRealEstate
}
