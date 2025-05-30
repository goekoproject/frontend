export interface CountryRequest {
  code: string
  label?: string
  regions?: { code: string; label: string }[]
}

export interface LocationRequest {
  country: CountryRequest
}

export interface SmeRequest {
  id: string
  name: string
}

export interface SolutionRequest {
  id: string
  sme: SmeRequest
  solutionName: string
  companyName: string
  locations: LocationRequest[]
  website: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  notes: string
  creationDate: string
}

export interface SolutionRequestCreate {
  solutionName: string
  companyName: string
  locations: LocationRequest[]
  website: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  notes: string
  classifications: [
    {
      mainCategory: string
      subCategory: string
    },
  ]
}

export type SolutionRequestUpdate = SolutionRequestCreate
