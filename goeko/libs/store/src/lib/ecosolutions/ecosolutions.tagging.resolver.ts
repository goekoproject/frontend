import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { shareReplay, throwError } from 'rxjs'
import { EcosolutionsTaggingService } from './ecosolutions.tagging.service'

export const ecosolutionFavouritesResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('id') as string
  if (!_smeId) {
    return throwError(() => new Error('"id" not found in route parameters'))
  }

  return inject(EcosolutionsTaggingService).getEcosolutionFavourites(_smeId).pipe(shareReplay(1))
}
