import { Classifications } from '../model/classifications.interface'
import { Locations } from '../model/locations.interface'
import { mapperLocations } from '../util/mapper-locations'

export class ProjectSearchPayload {
  name!: string
  smeId?: string
  classifications!: Classifications[]
  locations!: Locations[]

  constructor(projectPayload: any) {
    this.name = projectPayload.name
    this.smeId = projectPayload.smeId
    this.classifications = projectPayload.classifications
    this.locations = mapperLocations(projectPayload.locations)
  }
}
