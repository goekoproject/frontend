import { Classifications, ResponseClassifications } from '../model/classifications.interface'

export interface TaggingResponse {
  id: string
  ecosolution: TaggingEcosolutionDetail
  tag: string
}
interface TagginCompanyDetail {
  name: string
  logo: string
}
interface TaggingEcosolutionDetail {
  ecosolutionId: string
  companyDetail: TagginCompanyDetail
  solutionName: string
  description: string
  classification: Classifications
  classifications: ResponseClassifications[]
}
