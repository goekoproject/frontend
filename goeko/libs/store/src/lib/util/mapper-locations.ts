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
