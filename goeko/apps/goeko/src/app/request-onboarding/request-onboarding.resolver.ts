import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { of } from 'rxjs'
import { RequestOnboardingFacadeService } from './request-onboarding.service'

export const requestOnboardingMyIdeasResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('id') as string

  if (!_smeId) {
    return of(undefined)
  }

  return inject(RequestOnboardingFacadeService).getRequestMyIdeas(_smeId)
}

export const requestOnboardingMyCompanyResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('id') as string

  if (!_smeId) {
    return of(undefined)
  }

  return inject(RequestOnboardingFacadeService).getRequestMyCompany(_smeId)
}
