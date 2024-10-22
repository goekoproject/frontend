/* eslint-disable @angular-eslint/no-output-on-prefix */
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { Lang, LANGS } from '@goeko/core'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'goeko-select-i18n',
  templateUrl: './select-i18n.component.html',
  styleUrls: ['./select-i18n.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, OverlayModule],
})
export class SelectI18nComponent {
  private _translateServices = inject(TranslateService)
  private _currentCodeLang = this._translateServices.currentLang ?? this._translateServices.defaultLang
  public langs = LANGS

  public isOpen = false
  public selectedLand = signal<Lang | null>(this.langs.find((lang) => lang.code === this._currentCodeLang) || this.langs[0])
  toggle() {
    this.isOpen = !this.isOpen
  }

  selectedLang(lang: Lang) {
    this.selectedLand.set(lang)
    this._translateServices.use(lang.code)
    sessionStorage.setItem('lang', lang.code)
    this.isOpen = false
  }
}
