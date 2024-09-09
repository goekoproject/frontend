import { Pipe, PipeTransform, signal } from '@angular/core'
import { format } from '@formkit/tempo'
import { TranslateService } from '@ngx-translate/core'

@Pipe({
  name: 'goDateFormat',
  standalone: true,
  pure: false,
})
export class GoDateFormatPipe implements PipeTransform {
  langSignal = signal(this._translateService.currentLang || this._translateService.defaultLang)

  constructor(private _translateService: TranslateService) {
    this._translateService.onLangChange.pipe().subscribe((current) => this.langSignal.set(current.lang))
  }
  /**
   * Transforms a date value into a formatted string based on the provided style tokens.
   * Uses the library from https://tempo.formkit.com/#install for date formatting.
   * Documentation can be found at the provided link.
   *
   * @param value - The date value to format.
   * @param styleTokens - The format style tokens (default: 'DD/MM/YYYY').
   * @returns The formatted date string.
   */
  transform(value: string | Date | null | any, styleTokens: string = 'DD/MM/YYYY'): string {
    if (value) {
      console.log(styleTokens)
      return format(value, styleTokens, this.langSignal())
    }
    return ''
  }
}
