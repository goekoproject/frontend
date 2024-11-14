import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { of } from 'rxjs'
import { EcosolutionsSearchService } from './ecosolutions-search.service'

export const ecosolutionSearchDetailResolver = (route: ActivatedRouteSnapshot) => {
  const _ecosolutionId = route.paramMap.get('ecosolutionId') as string
  const _smeId = route.paramMap.get('smeId') as string

  if (!_ecosolutionId) {
    return of(undefined)
  }

  return inject(EcosolutionsSearchService).getEcosolutionSearchById(_ecosolutionId, _smeId)
}
