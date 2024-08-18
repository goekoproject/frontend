import { Classifications } from '../model/classificaciones.interface'

/**
 * Ecosolution result interface for sme
 */
export interface EcosolutionResult {
  id: string
  classification: Classifications // filter for cattegory
  companyDetail: EcosolutinResultCompanyDetail
  description: string
  favourite: boolean
  solutionName: string
  notInterested: boolean
  sustainableDevelopmentGoals: number[]
}

interface EcosolutinResultCompanyDetail {
  id: string
  logo: string
  name: string
}
