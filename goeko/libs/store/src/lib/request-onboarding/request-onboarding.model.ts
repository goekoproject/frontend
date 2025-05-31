import { CodeLabel } from '../model/classifications.interface'

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

export interface ClassificationResponseRequest {
  category: CodeLabel
  subCategory: CodeLabel
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
  classifications: ClassificationResponseRequest[]
}

export interface ClassificationCreateRequest {
  mainCategory: string
  subCategory: string
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
  classifications: ClassificationCreateRequest[]
}

export type SolutionRequestUpdate = SolutionRequestCreate
