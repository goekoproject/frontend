import { CodeLabel } from '../model/classifications.interface'

export interface CountryRequest {
  code: string
  label?: string
  regions?: { code: string; label: string }[]
}

export interface LocationRequest {
  country: CountryRequest
}

export interface SmeRequestOnboarding {
  id: string
  name: string
}
export interface SmeResponseOnboarding extends SmeRequestOnboarding {
  identifier: string
  email: string
}

export interface ClassificationResponseRequest {
  category: CodeLabel
  subcategory: CodeLabel
}
export interface ClassificationRequest {
  category: CodeLabel
  subCategory: CodeLabel
}

export interface SolutionRequest {
  id: string
  sme: SmeRequestOnboarding
  solutionName: string
  companyName: string
  locations: LocationRequest[]
  website: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  notes: string
  creationDate: string
  classifications: ClassificationRequest[]
}
export interface SolutionResponse {
  companyName: string
  contactEmail: string
  contactPerson: string
  contactPhone: string
  creationDate: string
  id: string
  locations: LocationRequest[]
  notes: string
  sme: SmeResponseOnboarding
  solutionName: string
  website: string
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
