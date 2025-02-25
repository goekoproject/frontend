/* eslint-disable @angular-eslint/no-output-on-prefix */
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { Component, inject, input, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'
import { Lang, LANGS } from '@goeko/core'
import { ButtonModule, IArrowDownComponent } from '@goeko/ui'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'goeko-select-i18n',
  templateUrl: './select-i18n.component.html',
  styleUrls: ['./select-i18n.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, OverlayModule, IArrowDownComponent],
})
export class SelectI18nComponent implements OnInit {
  private _translateServices = inject(TranslateService)
  private _router = inject(Router)
  private _currentCodeLang = (localStorage.getItem('lang') as string) || this._translateServices.getBrowserLang()
  public langs = input(LANGS)

  public isOpen = false
  public selectedLand = signal<Lang | null>(this.langs().find((lang) => lang.code === this._currentCodeLang) || this.langs()[0])
  toggle() {
    this.isOpen = !this.isOpen
  }
  ngOnInit(): void {
    this._changeLang()
  }

  selectedLang(lang: Lang) {
    this.selectedLand.set(lang)
    this._translateServices.use(lang.code)
    localStorage.setItem('lang', lang.code)
    this.isOpen = false
  }

  private _changeLang() {
    this._translateServices.onLangChange.subscribe((res) => {
      this._fetchData(res.lang)
    })
  }
  private _fetchData(lang: string) {
    this._router.navigate([], {
      relativeTo: this._router.routerState.root,
      queryParams: { lang: lang },
    })
  }
}
