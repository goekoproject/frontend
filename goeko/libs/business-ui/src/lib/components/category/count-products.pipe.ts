import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'countProducts',
  standalone: true,
})
export class CountProductsPipe implements PipeTransform {
  transform(subcategories: any): number | string {
    if (!subcategories) {
      return ''
    }
    let products = 0
    Object.keys(subcategories).forEach((subcategoriesCode) => {
      const productsCode = subcategories[subcategoriesCode]
      products += productsCode.length
    })

    return products !== 0 ? `(${products})` : ''
  }
}
