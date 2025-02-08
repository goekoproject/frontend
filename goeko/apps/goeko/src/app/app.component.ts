import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PopupModule } from '@goeko/business-ui'
import { TranslateDirective } from '@ngx-translate/core'

const KEY_COOKIES = 'cookie-policy'
@Component({
  selector: 'goeko-root',
  imports: [RouterOutlet, TranslateDirective, PopupModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  public path!: string

  get showPopupCookies() {
    return !localStorage.getItem(KEY_COOKIES)
  }

  get isDemo() {
    return this.path?.includes('demo')
  }

  public isPrivateZone = signal<boolean>(false)

  acceptCookie() {
    localStorage.setItem(KEY_COOKIES, 'true')
  }
}
