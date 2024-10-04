import { Classifications, LocationsCountry, SmeUser } from '@goeko/store'
import { formToClassificationsMapper } from '../../sme-form-analysis/sme-analysis.request'

export class CriteriaEcosolutionSearch {
  classifications: Array<Classifications>
  locations: Array<LocationsCountry>
  smeId: string

  constructor(projectData: any, userProfile: SmeUser) {
    this.classifications = projectData['classifications'] ? projectData.classifications :   formToClassificationsMapper(projectData)
    this.locations = projectData.locations
    this.smeId = userProfile.id
  }
}
