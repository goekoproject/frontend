export interface Country {
  code: string;
  label?: string;
  regions?: { code: string; label: string }[];
}

export interface Location {
  country: Country;
}

export interface Sme {
  id: string;
  name: string;
}

export interface SolutionRequest {
  id: string;
  sme: Sme;
  solutionName: string;
  companyName: string;
  locations: Location[];
  website: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
  creationDate: string;
}

export interface SolutionRequestCreate {
  solutionName: string;
  companyName: string;
  locations: Location[];
  website: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
}

export type SolutionRequestUpdate = SolutionRequestCreate;
