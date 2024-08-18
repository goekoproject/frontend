import { Component, OnInit, signal } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

const KEY_COOKIES = 'cookie-policy'
@Component({
  selector: 'goeko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public path!: string

  get showPopupCookies() {
    return !localStorage.getItem(KEY_COOKIES)
  }

  get isDemo() {
    return this.path?.includes('demo')
  }

  public isPrivateZone = signal<boolean>(false)
  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    this._translate.use('fr')
  }

  acceptCookie() {
    localStorage.setItem(KEY_COOKIES, 'true')
  }
}
