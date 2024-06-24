import { inject, signal } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

export abstract class TranslateChangeService {
  private _translateService = inject(TranslateService)
  public lang = signal(this._translateService.currentLang || this._translateService.defaultLang)

  changeLang() {
    this._translateService.onLangChange.pipe().subscribe((current: any) => this.lang.set(current.lang === 'en' ? 'gb' : current.lang))
  }
}
