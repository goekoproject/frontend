import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { FINANCING_TYPE } from '@goeko/store'
import { forkJoin, of, shareReplay } from 'rxjs'
import { FundingService } from './funding.service'

export const getKindOfFunding = (route: ActivatedRouteSnapshot) => {
  const _fundingService = inject(FundingService)
  const _bankId = route.paramMap.get('bankId') as string
  if (!_bankId) {
    return of(undefined)
  }
  const realStateLoan$ = _fundingService.getKindOfFinancingById(FINANCING_TYPE.RealEstate, _bankId)
  return forkJoin({
    realStateLoan: realStateLoan$,
  }).pipe(shareReplay(1))
}
