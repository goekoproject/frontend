import { Classifications, Country, SmeUser } from '@goeko/store'
import { formToClassificationsMapper } from '../../sme-form-analysis/sme-analysis.request'

export class CriteriaEcosolutionSearch {
  classifications: Array<Classifications>
  locations: Array<Country>
  smeId: string

  constructor(currentAnalytics: any, userProfile: SmeUser) {
    this.classifications = formToClassificationsMapper(currentAnalytics)
    this.locations = userProfile.locations
    this.smeId = userProfile.id
  }
}
