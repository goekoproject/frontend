import { Pipe, PipeTransform } from '@angular/core'
import { ResponseClassifications } from '../../model/classifications.interface'

@Pipe({
  name: 'classificationsLabel',
  standalone: true,
})
export class ClassificationsLabelPipe implements PipeTransform {
  transform(value: ResponseClassifications[]): string[] {
    if (!value) {
      return []
    }
    const uniqueLabels = new Set(value.map((c) => c.category.label))
    return Array.from(uniqueLabels)
  }
}
