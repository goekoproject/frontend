export interface Country {
  code: string
  regions?: string[]
}

export interface LocationsCountry {
  country: Country
}
