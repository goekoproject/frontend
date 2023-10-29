import { Component, OnInit } from '@angular/core';
import { MENU_USER } from './menu-user.contants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, LANGS } from '@goeko/core';
import { Router } from '@angular/router';
import { SmeService, UserService } from '@goeko/store';

@Component({
	selector: 'goeko-menu-user',
	templateUrl: './menu-user.component.html',
	styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {
	langs = LANGS;
	defaultLang!: any;
	public menuOptions = MENU_USER;
	dataProfile!: any;
	private _smeID!: string;
	constructor(
		private translate: TranslateService,
		private _authService: AuthService,
		private _router: Router,
		private _smeServices: SmeService,
		private _userService: UserService
	) {}
	ngOnInit(): void {
		this.defaultLang = this.langs.find((lang) => lang.code === this.translate.getDefaultLang());
		this._authService.authData.subscribe((authData) => (this.dataProfile = authData));
		this._userService.companyDetail.subscribe((company: any) => (this._smeID = company?.id));
	}

	onRouterLinkActive(test: any): void {
		console.log('onRouterLink', test);
	}

	onChangeLangs(selectedLand: any) {
		this.translate.use(selectedLand.code);
	}

	logout() {
		this._authService.logout();
	}
	goTo(route: string) {
		switch (route) {
			case 'profile':
				// eslint-disable-next-line no-case-declarations
				const id = this._smeID;
				this._router.navigate(['profile', id]);
				return;

			default:
				this._router.navigate([route]);
				return;
		}
	}
}
