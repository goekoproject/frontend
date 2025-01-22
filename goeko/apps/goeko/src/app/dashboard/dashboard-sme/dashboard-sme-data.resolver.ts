import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { map, of, shareReplay } from 'rxjs'
import { DashboardSmeService } from './dashboard-sme.service'

export const dataSummaryResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('id') as string
  if (!_smeId) {
    return of(undefined)
  }

  return inject(DashboardSmeService)
    .getDashboardData(_smeId)
    .pipe(
      map((data) => data.summary),
      shareReplay(1),
    )
}

export const dataEcosolutionFavouritesResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('id') as string
  if (!_smeId) {
    return of(undefined)
  }

  return inject(DashboardSmeService).getEcosolutionFavourites(_smeId).pipe(shareReplay(1))
}
