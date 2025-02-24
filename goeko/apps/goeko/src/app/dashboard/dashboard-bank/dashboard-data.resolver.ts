import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { map, of } from 'rxjs'
import { DashboardBankService } from './dashboard-bank.service'

export const leadOfBank = (route: ActivatedRouteSnapshot) => {
  const _dashboardBankService = inject(DashboardBankService)

  const _id = route.paramMap.get('id') as string
  if (!_id) {
    return of(undefined)
  }
  return _dashboardBankService.getLeads(_id)
}

export const dashboardData = (route: ActivatedRouteSnapshot) => {
  const _dashboardBankService = inject(DashboardBankService)

  const _id = route.paramMap.get('id') as string
  if (!_id) {
    return of(undefined)
  }
  return _dashboardBankService.getDashboardData(_id).pipe(map((data) => data.summary))
}
