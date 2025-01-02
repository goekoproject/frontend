import { Pipe, PipeTransform } from '@angular/core'
import { Translations } from '@goeko/store'

@Pipe({
  name: 'labelByCategory',
  standalone: true,
})
export class LabelByCategoryPipe implements PipeTransform {
  transform(value: Translations[], code: string): string {
    return value.find((translation: Translations) => translation.lang === code)?.label || ''
  }
}
