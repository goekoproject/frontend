import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { of, shareReplay } from 'rxjs'
import { EcosolutionsSearchService } from '../ecosolutions-search/ecosolutions-search.service'
import { ProjectService } from '../sme/project.services'

export const projectResolver = (route: ActivatedRouteSnapshot) => {
  const _projectId = route.paramMap.get('projectId') as string
  const _smeId = route.paramMap.get('smeId') as string
  if (!_projectId || !_smeId) {
    return of(undefined)
  }

  return inject(EcosolutionsSearchService).getSearchProjectById({ smeId: _smeId, projectId: _projectId }).pipe(shareReplay(1))
}

export const projectListResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('smeId') as string
  if (!_smeId) {
    return of(undefined)
  }

  return inject(ProjectService).getProjects(_smeId)
}
