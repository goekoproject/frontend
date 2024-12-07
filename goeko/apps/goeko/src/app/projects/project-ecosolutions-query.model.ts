import { Classifications, LocationsCountry, LocationTranslated, Project } from '@goeko/store'
import { formToClassificationsMapper } from '../sme-analysis-form/sme-form-analysis/sme-analysis.request'

export class ProjectEcosolutionsQuery {
  classifications: Array<Classifications>
  locations: Array<LocationsCountry>
  smeId: string

  constructor(projectData: Project, smeId: string) {
    this.classifications = projectData['classifications'] ? projectData.classifications : formToClassificationsMapper(projectData)
    this.locations = projectData.locations?.map((location: LocationTranslated) => this.mapLocation(location))
    this.smeId = smeId
  }

  //TODO: Implement decorator for this
  private mapLocation(location: LocationTranslated): LocationsCountry {
    return {
      country: {
        code: location.country.code,
        regions: location.country.regions ? location.country.regions.map((region) => region.code) : [],
      },
    }
  }
}

export class ProjectEcosolutionParams {
  classifications: Array<Classifications>
  locations: Array<LocationsCountry>
  name: string

  constructor(projectData: Project) {
    this.classifications = projectData['classifications'] ? projectData.classifications : formToClassificationsMapper(projectData)
    this.locations = projectData?.locations?.map((location: LocationTranslated) => this.mapLocation(location))
    this.name = projectData.name
  }

  //TODO: Implement decorator for this
  private mapLocation(location: LocationTranslated): LocationsCountry {
    return {
      country: {
        code: location.country.code,
        regions: location.country.regions ? location.country.regions.map((region) => region.code) : undefined,
      },
    }
  }
}
