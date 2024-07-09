import { Classifications } from '../model/classificaciones.interface'
import { Locations } from '../model/locations.interface'

export interface EcosolutionSearchRequest {
  classifications: Classifications[]
  locations?: Array<Locations>
  smiId ?: string
}
