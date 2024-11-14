import { Classifications, LocationsCountry, LocationTranslated, SmeUser } from '@goeko/store'
import { formToClassificationsMapper } from '../../sme-form-analysis/sme-analysis.request'

export class CriteriaEcosolutionSearch {
  classifications: Array<Classifications>
  locations: Array<LocationsCountry>
  smeId: string

  constructor(projectData: any, userProfile: SmeUser) {
    this.classifications = projectData['classifications'] ? projectData.classifications : formToClassificationsMapper(projectData)
    this.locations = projectData.locations.map((location: LocationTranslated) =>this.mapLocation(location))
    this.smeId = userProfile.id
  }

  //TODO: Implement decorator for this
  private mapLocation(location: LocationTranslated): LocationsCountry {
    return {
      country: {
        code: location.country.code,
        regions: location.country.regions ? location.country.regions.map(region => region.label) : []
      }
    };
  }
}
