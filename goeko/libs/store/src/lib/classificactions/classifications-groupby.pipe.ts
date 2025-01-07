import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'classificationsGroupBy',
  standalone: true,
})
export class ClassificationsGroupByPipe implements PipeTransform {
  transform(value: any[], key = 'category'): any {
    if (!value || !key) {
      return value
    }

    return value.reduce((result, currentValue) => {
      const groupKey = currentValue[key].code
      if (!result[groupKey]) {
        result[groupKey] = []
      }
      result[groupKey].push(currentValue)
      return result
    }, {})
  }
}
