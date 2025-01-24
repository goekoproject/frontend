import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { map, shareReplay, throwError } from 'rxjs'
import { DashboardSmeService } from './dashboard-sme.service'

export const dataSummaryResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('id') as string
  if (!_smeId) {
    return throwError(() => new Error('"id" not found in route parameters'))
  }

  return inject(DashboardSmeService)
    .getDashboardData(_smeId)
    .pipe(
      map((data) => data.summary),
      shareReplay(1),
    )
}
