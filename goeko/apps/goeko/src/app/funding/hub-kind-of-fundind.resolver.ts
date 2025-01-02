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
  const sustainableEquipment$ = _fundingService.getKindOfFinancingById(FINANCING_TYPE.SustainableEquipment, _bankId)

  return forkJoin({
    realStateLoan: realStateLoan$,
    sustainableEquipment: sustainableEquipment$,
  }).pipe(shareReplay(1))
}

export const getDataRealStateLoan = (route: ActivatedRouteSnapshot) => {
  const _fundingService = inject(FundingService)
  const _id = route.paramMap.get('id') as string
  if (!_id) {
    return of(undefined)
  }
  return _fundingService.getRealStateLoanById(_id)
}

export const getSustainableEquipment = (route: ActivatedRouteSnapshot) => {
  const _fundingService = inject(FundingService)
  const _id = route.paramMap.get('id') as string
  if (!_id) {
    return of(undefined)
  }
  return _fundingService.getSustainableEquipmentById(_id)
}
