import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { of } from 'rxjs'
import { RequestOnboardingFacadeService } from './request-onboarding.service'

export const requestOnboardingResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('smeId') as string

  if (!_smeId) {
    return of(undefined)
  }

  return inject(RequestOnboardingFacadeService).getRequest(_smeId)
}
