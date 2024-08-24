export interface LeadResponse {
  id: string
  message: string
  date: Date
  ecosolution: Ecosolution
  sme: Sme
}

export interface Ecosolution {
  id: string
  name: string
  description: string
}

interface Sme {
  id: string
  name: string
}
