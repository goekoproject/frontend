import { Component, inject, OnInit } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { PopupModule } from '@goeko/business-ui'
import { ToastComponent } from '@goeko/store'
import { DialogMessageModule, SideDialogModule } from '@goeko/ui'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

const KEY_COOKIES = 'cookie-policy'
@Component({
  selector: 'goeko-root',
  imports: [RouterOutlet, TranslatePipe, PopupModule, RouterLink, SideDialogModule, DialogMessageModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent implements OnInit {
  private _translateService = inject(TranslateService)
  public path!: string

  get showPopupCookies() {
    return !localStorage.getItem(KEY_COOKIES)
  }

  ngOnInit(): void {
    this._setUpLang()
  }

  private _setUpLang() {
    const currentLang = (localStorage.getItem('lang') || this._translateService.getBrowserLang()) as string
    this._translateService.setDefaultLang(currentLang)
    this._translateService.use(currentLang)
  }

  acceptCookie() {
    localStorage.setItem(KEY_COOKIES, 'true')
  }
}
