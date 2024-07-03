import { Classifications, Country } from '@goeko/store'
import { formToClassificationsMapper } from '../../sme-form-analysis/sme-analysis.request'

export class CriteriaEcosolutionSearch {
  classifications: Array<Classifications>
  locations: Array<Country>

  constructor(currentAnalytics: any, userProfile: any) {
    this.classifications = formToClassificationsMapper(currentAnalytics)
    this.locations = userProfile.locations
  }
}
