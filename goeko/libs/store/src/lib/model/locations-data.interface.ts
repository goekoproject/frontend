/** Interface for get data of select */

interface LocationParmas {
  code: string
  label: string
}

export interface LocationRegions extends LocationParmas {
  isAll?: boolean
}

export interface LocationCountry extends LocationParmas {}
