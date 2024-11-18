import { inject } from '@angular/core'
import { ClassificationsService } from './classifications.service'

export const groupingFormCategoriesResolver = () => {
  return inject(ClassificationsService).groupingFormCategories()
}
