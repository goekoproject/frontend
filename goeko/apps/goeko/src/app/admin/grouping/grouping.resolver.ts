import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { ClassificationsService } from '@goeko/store'

export const groupingByClassificationsResolver = (route: ActivatedRouteSnapshot) => {
  const _id = route.paramMap.get('groupingId') as string
  return inject(ClassificationsService).getGroupingById(_id)
}
