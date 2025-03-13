import { LocationProvider } from '../model/location-provider.interface'

export function mapperLocations(locations: LocationProvider[]): any[] {
  return locations.map((location: LocationProvider | any) => ({
    ...location,
    country: {
      code: location?.country?.code,
      regions:
        location?.country?.regions &&
        location?.country?.regions.length > 0 &&
        location?.country?.regions?.every((region: any) => region.code)
          ? location?.country?.regions?.map((region: any) => region.code)
          : undefined,
    },
  }))
}

interface LocationEcosolutions {
  country: { code: string; regions: { code: string; label: string }[] }
}
export function mapperLocationsEcosolutionManagment(locations: LocationEcosolutions[]): any[] {
  return locations.map((location) => ({
    ...location,
    country: {
      code: location?.country?.code,
      regions: getRegions(location.country.regions),
    },
  }))
}

const getRegions = (regions: { code: string; label: string }[]) => {
  const regionCodes = regions?.filter((r) => r.code)?.map((region) => region.code)
  return regionCodes && regionCodes.length > 0 ? regionCodes : undefined
}
