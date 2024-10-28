import { Component, signal } from '@angular/core'

const KEY_COOKIES = 'cookie-policy'
@Component({
  selector: 'goeko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
