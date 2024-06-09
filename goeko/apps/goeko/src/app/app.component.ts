import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, effect, signal } from '@angular/core';
import { VAR_GENERAL } from '@goeko/business-ui';
import { AuthService, REMOTE_CONFIG_PARAMS, RemoteConfigService } from '@goeko/core';
import { PaymentSystemService, STATUS_PENDING, USER_TYPE, UserService } from '@goeko/store';
import { NotificationService } from '@goeko/ui';
import { TranslateService } from '@ngx-translate/core';

const KEY_COOKIES = 'cookie-policy';
@Component({
  selector: 'goeko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public path!: string;

  get showPopupCookies() {
    return !localStorage.getItem(KEY_COOKIES);
  }

  private _isHomePage() {
    return location.pathname.includes('home') || location.pathname
    .includes('demo') || location.pathname
    === '/';
  }

  get isDemo() {
    return this.path?.includes('demo');
  }
  get isSubscribed() {
    return this._paymentService.isSubscription
  }

  get cleantechUnsubscribed() {
    return this._cleantechUnsubscribed;
  }

  set cleantechUnsubscribed(value: boolean) {
    this._cleantechUnsubscribed = value;
  }

  private _cleantechUnsubscribed!: boolean;
  private _isSuscriptionNeed = signal(this._remoteConfigService.getValue(REMOTE_CONFIG_PARAMS.SUSBCRIPTION_NEED).asBoolean())

  public isAuthenticated$ = this._authService.isAuthenticated$;
  public isPrivateZone = signal<boolean>(false);
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private _paymentService: PaymentSystemService,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _translate: TranslateService,
    private readonly userService: UserService,
    private readonly _remoteConfigService: RemoteConfigService

    ) {
      effect(()=> {
        this._hanlderCleantechSuscriptions();
      })
    }

  ngOnInit(): void {
    this._manageClientZone();
    this._messageAfterSignUp();
    this._translate.use('fr');

  }


  private _hanlderCleantechSuscriptions(): void {
    if(!this._isSuscriptionNeed()) {
      return;
    }
    if(this.userService.userType() && this.isSubscribed !== STATUS_PENDING) {
      this.cleantechUnsubscribed = this.userService.userType() === USER_TYPE.CLEANTECH && !this.isSubscribed;
      this._showNotificationsCleantechUnsubscribed();
    }
  }

  private _showNotificationsCleantechUnsubscribed() {
      if(this.cleantechUnsubscribed) {
        this._notificationService.notify( {data: { texts: [
          'MESSAGE_SUBSCRIPTION_BANNER.messageAlert',
           this._translate.instant('MESSAGE_SUBSCRIPTION_BANNER.messageContact',{email: VAR_GENERAL.GOEKO_EMAIL})
        ]}})
      }
  }
 

  private _manageClientZone() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      const isPrivateZone = isAuthenticated && !this._isHomePage();
      this.isPrivateZone.set(isPrivateZone);      
    });
  } 

  private _messageAfterSignUp() {
    const urlAutenticateDecoe = decodeURI(window.location.search);
    if(urlAutenticateDecoe.includes('verify')) {
      this._authService.logout( `${this.doc.location.origin}/verify-email`);
   }
  }
  acceptCookie() {
    localStorage.setItem(KEY_COOKIES, 'true');
  }


}
