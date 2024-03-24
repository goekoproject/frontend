import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadDataUser } from '@goeko/business-ui';
import { AuthService } from '@goeko/core';
import { PaymentSystemService } from '@goeko/store';

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

  isHomePage() {
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

  public isAuthenticated$ = this._authService.isAuthenticated$;
  public isPrivateZone: boolean = false;

  constructor(private _router: Router,private route: ActivatedRoute,
    @Inject(DOCUMENT) private doc: Document,
    private _paymentService: PaymentSystemService,
     private _authService: AuthService) {}

  ngOnInit(): void {
    this._manageClientZone();
    this._messageAfterSignUp();
  }

  private _manageClientZone() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isPrivateZone = isAuthenticated && !this.isHomePage();
      console.log(this.isPrivateZone);
      
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
