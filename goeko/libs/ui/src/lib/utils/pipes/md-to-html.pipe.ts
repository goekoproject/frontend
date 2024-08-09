import { Pipe, PipeTransform } from '@angular/core'
import { marked } from 'marked'

@Pipe({
  name: 'mdToHtml',
  standalone: true,
})
export class MdToHtmlPipe implements PipeTransform {
  transform(value: string | number | boolean | null | any): string | Promise<string> {
    if (!value) {
      return ''
    }
    return marked(value as string)
  }
}
