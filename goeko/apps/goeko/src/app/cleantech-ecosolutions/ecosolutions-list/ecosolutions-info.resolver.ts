import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { throwError } from 'rxjs'
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services'
import { TranslateService } from '@ngx-translate/core'

export const ecosolutionsInfoResolver = (route: ActivatedRouteSnapshot) => {
  const cleantechEcosolutionsService = inject(CleantechEcosolutionsService)
  const translateService = inject(TranslateService)
  const id = route.paramMap.get('id') as string
  if (!id) {
    return throwError(() => new Error('Missing id on path'))
  }
  return cleantechEcosolutionsService.getAllEcosolutionsByCleanTech(id)
}
