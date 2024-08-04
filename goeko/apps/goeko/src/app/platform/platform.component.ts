import { DOCUMENT } from '@angular/common'
import { Component, effect, Inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { VAR_GENERAL } from '@goeko/business-ui'
import { AuthService, REMOTE_CONFIG_PARAMS, RemoteConfigService } from '@goeko/core'
import { PaymentSystemService, STATUS_PENDING, USER_TYPE, UserService } from '@goeko/store'
import { NotificationService } from '@goeko/ui'
import { TranslateService } from '@ngx-translate/core'
import { environment } from '../../environments/environment'

@Component({
  selector: 'goeko-platform',
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss',
})
export class PlatformComponent implements OnInit {
  get isSubscribed() {
    if (!environment.production) {
      return true
    }
    return this._paymentService.isSubscription
  }
  get cleantechUnsubscribed() {
    return this._cleantechUnsubscribed
  }
  set cleantechUnsubscribed(value: boolean) {
    this._cleantechUnsubscribed = value
  }
  private _cleantechUnsubscribed!: boolean
  private _isSuscriptionNeed = signal(this._remoteConfigService.getValue(REMOTE_CONFIG_PARAMS.SUSBCRIPTION_NEED).asBoolean())

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private _authService: AuthService,
    private readonly _userService: UserService,
    private _notificationService: NotificationService,
    private readonly _remoteConfigService: RemoteConfigService,
    private _paymentService: PaymentSystemService,
    private _translate: TranslateService,
    private _router: Router,
    private _activateddRoute: ActivatedRoute,
  ) {
    effect(() => {
      this._hanlderCleantechSuscriptions()
    })
  }

  ngOnInit(): void {
    this._loadAuhtUser()
    this._messageAfterSignUp()
  }

  private _loadAuhtUser() {
    this._authService.userAuth$.subscribe((user) => {
      if (user) {
        this._userService.setUserData(user)
      }
    })
  }
  private _messageAfterSignUp() {
    this._authService._auth0.getAccessTokenSilently().subscribe({
      error: (error) => {
        const urlPageEmailVerify = `${this.doc.location.origin}/verify-email`
        if (error.error_description.includes('verify your email')) {
          this._authService.logout(urlPageEmailVerify)
        }
      },
    })
  }
  private _hanlderCleantechSuscriptions(): void {
    if (!this._isSuscriptionNeed()) {
      return
    }
    if (this._userService.userType() && this.isSubscribed !== STATUS_PENDING) {
      this.cleantechUnsubscribed = this._userService.userType() === USER_TYPE.CLEANTECH && !this.isSubscribed
      this._showNotificationsCleantechUnsubscribed()
    }
  }

  private _showNotificationsCleantechUnsubscribed() {
    if (this.cleantechUnsubscribed) {
      this._notificationService.notify({
        data: {
          texts: [
            'MESSAGE_SUBSCRIPTION_BANNER.messageAlert',
            this._translate.instant('MESSAGE_SUBSCRIPTION_BANNER.messageContact', { email: VAR_GENERAL.GOEKO_EMAIL }),
          ],
        },
      })
    }
  }
}
