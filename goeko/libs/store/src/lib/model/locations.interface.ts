
export interface SmeCountry {
  code: string
  regions?: Array<string>
  label?: string
}
export interface Locations {
  country: SmeCountry
}
