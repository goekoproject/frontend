import { Classifications, LocationsCountry, LocationTranslated, Project, ResponseClassifications } from '@goeko/store'
import { formToClassificationsMapper } from '../sme-analysis-form/sme-form-analysis/sme-analysis.request'

const mapperResponseClassificationstoClassifications = (classification: ResponseClassifications[]): Classifications[] => {
  return classification.map((classification) => ({
    mainCategory: classification.category.code,
    subCategory: classification.subcategory.code,
    products: classification.products.map((product) => product.code),
  }))
}
/**
 * Query payload for search project ecosolutions
 */
export class ProjectEcosolutionsQuery {
  classifications: Array<Classifications>
  locations: Array<LocationsCountry>
  smeId: string

  constructor(projectData: Project, smeId: string) {
    this.classifications = mapperResponseClassificationstoClassifications(projectData.classifications)
    this.locations = projectData.locations?.map((location: LocationTranslated) => this.mapLocation(location))
    this.smeId = smeId
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

/**
 * Save and update project ecosolution payload
 */
export class ProjectEcosolutionPayload {
  classifications: Array<Classifications>
  locations: Array<LocationsCountry>
  name: string

  constructor(projectData: Project) {
    this.classifications = formToClassificationsMapper(projectData)
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
