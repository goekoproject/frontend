import { inject } from '@angular/core'
import { FundingService } from '../funding.service'
export const searchFunding = () => {
  return inject(FundingService).searchFunding()
}
