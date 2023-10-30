import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService, UserContextService } from '@goeko/core';
import { UserService } from '@goeko/store';
import { combineLatest, distinctUntilChanged, filter } from 'rxjs';

const KEY_COOKIES = 'cookie-policy';
@Component({
	selector: 'goeko-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
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

	getIsAuthenticated() {
		return (
			this._authService.isAuthenticated() &&
			!window.location.pathname.includes('/autenticate') &&
			!window.location.pathname.includes('/login')
		);
	}
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _userContextService: UserContextService,
		private _userService: UserService,
		private _authService: AuthService
	) {
		this._routeChange();
		console.log(this.showPopupCookies);
	}

	ngAfterViewInit(): void {
		this._getUserContext();
	}

	ngOnInit(): void {}
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

	private _getUserContext() {
		combineLatest({
			userType: this._userContextService.userType,
			externalId: this._userContextService.externalId,
			username: this._userContextService.username,
		}).subscribe((res: { userType: string; externalId: string; username: string }) => {
			if (res) {
				this._userService.getUserProfile(res.userType, res.externalId);
			}
		});
	}

	private _getUserProfile() {
		this._userService.getUserProfile(this._userType, this._externalId);
	}
}
