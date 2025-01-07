import { Classifications } from '../model/classifications.interface'
import { Locations } from '../model/locations.interface'

export interface EcosolutionSearchRequest {
  classifications: Classifications[]
  locations?: Array<Locations>
  smiId?: string
}
