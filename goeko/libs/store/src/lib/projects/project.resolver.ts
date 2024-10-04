import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { of } from 'rxjs'
import { ProjectService } from '../sme/project.services'

export const projectResolver = (route: ActivatedRouteSnapshot) => {
  const _projectId = route.paramMap.get('projectId') as string
  const _smeId = route.paramMap.get('smeId') as string
  if (!_projectId || !_smeId) {
    return of(undefined)
  }

  return inject(ProjectService).getProjectId({ smeId: _smeId, projectId: _projectId })
}

export const projectListResolver = (route: ActivatedRouteSnapshot) => {
  const _smeId = route.paramMap.get('smeId') as string
  if (!_smeId) {
    return of(undefined)
  }

  return inject(ProjectService).getProjects(_smeId)
}

