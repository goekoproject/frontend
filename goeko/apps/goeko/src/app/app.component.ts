import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@goeko/core';
import { distinctUntilChanged, filter } from 'rxjs';

const KEY_COOKIES = 'cookie-policy';
@Component({
	selector: 'goeko-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public path!: string;

	get showPopupCookies() {
		return !sessionStorage.getItem(KEY_COOKIES);
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
	constructor(private router: Router, private route: ActivatedRoute, private _authService: AuthService) {
		this._routeChange();
		console.log(this.showPopupCookies);
	}

	acceptCookie() {
		sessionStorage.setItem(KEY_COOKIES, 'true');
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
