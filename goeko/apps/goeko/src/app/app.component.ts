import { AfterContentInit, Component, OnInit, effect } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@goeko/core';
import { UserService } from '@goeko/store';
import { LoadingGoekoervice } from 'libs/business-ui/src/lib/components/first-loading/goeko-loading';
import { distinctUntilChanged, filter } from 'rxjs';
const namespace = 'https://goeko';

const KEY_COOKIES = 'cookie-policy';
@Component({
  selector: 'goeko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public path!: string;
  private _userType!: string;
  private _externalId!: string;

  get showPopupCookies() {
    return !localStorage.getItem(KEY_COOKIES);
  }

  get isHome() {
    return this.router.url.includes('home') || this.router.url.includes('demo');
  }

  get isDemo() {
    return this.path?.includes('demo');
  }

  public isAuthenticated$ = this._authService.isAuthenticated$;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService,
    private _authService: AuthService,
    private _userServcies: UserService
  ) {
    this._routeChange();
  }

  ngOnInit(): void {
    this._reload();
  }

  private _reload() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this._loadUserData();
      }
    });
  }
  private _loadUserData() {
    this._authService.userAuth$.subscribe((userData) => {
      if (userData) {
        const userDataTransform = {
          ...userData,
          externalId: userData?.sub?.replace('auth0|', ''),
          roles: userData[`${namespace}/roles`],
        };
        this._userService.userAuth.set(userDataTransform);
        this.router.navigate([`dashboard/${userData['userType']}`]);
      }
    });
  }
  acceptCookie() {
    localStorage.setItem(KEY_COOKIES, 'true');
  }

  private _routeChange() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.path = (this.route.snapshot as any)['_routerState'].url;
      });
  }
}
