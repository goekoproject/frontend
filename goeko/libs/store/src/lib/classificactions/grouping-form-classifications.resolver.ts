import { inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { ClassificationsService } from './classifications.service'
import { GroupingType } from './grouping-type.enum'

export const groupingFormCategoriesResolver = (route: ActivatedRouteSnapshot) => {
  const _groupingCode = route.data['groupingCode'] || GroupingType.construction
  return inject(ClassificationsService).groupingFormCategories(_groupingCode)
}
