import { inject } from '@angular/core'
import { ProjectService } from '../sme/project.services'

export const groupingFormCategoriesResolver = () => {
  return inject(ProjectService).getGroupingFormCategories()
}
