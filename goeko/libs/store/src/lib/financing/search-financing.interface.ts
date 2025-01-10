import { Classifications } from '../model/classifications.interface'

export interface SearchSustainableEquipment {
  sustainableEquipment: {
    classifications: Classifications[]
    locations: Location[]
  }
  realEstate: {
    classifications: Classifications[]
    locations: Location[]
  }
}
