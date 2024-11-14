import { Pipe, PipeTransform } from '@angular/core'
import { CATEGORIES } from '@goeko/business-ui'
import { IProjectForm } from './project-form.model'

@Pipe({
  name: 'countProducts',
  standalone: true,
})
export class CountProductsPipe implements PipeTransform {
  transform(formValue: IProjectForm, categoryCode: string = CATEGORIES.CO2_EMISSION): number | string {
    if (!formValue) {
      return ''
    }
    const category = formValue[categoryCode]
    let products = 0
    Object.keys(category).forEach((subcategoriesCode) => {
      const subcategories = category[subcategoriesCode]
      products += subcategories.length
    })

    return products
  }
}
