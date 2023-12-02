import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserContextService } from '@goeko/core';
import { UserService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { MENU_USER_CLEANTECH, MENU_USER_SME, MenuUser } from './menu-user.contants';

export const SELECT_MENU_USER = {
	cleantech: MENU_USER_CLEANTECH,
	sme: MENU_USER_SME,
};

@Component({
	selector: 'goeko-menu-user',
	templateUrl: './menu-user.component.html',
	styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {
	public menuOptions!: MenuUser[];
	private _companyId!: string;
	private _userType!: string;
	constructor(
		private translate: TranslateService,
		private _authService: AuthService,
		private _router: Router,
		private _userService: UserService,
		private _userContextService: UserContextService
	) {}
	ngOnInit(): void {
		this._userService.companyDetail.subscribe((company: any) => (this._companyId = company?.id));
		this._userContextService.userType.subscribe((userType: string) => {
			if (userType) {
				this.menuOptions = SELECT_MENU_USER[userType as keyof typeof SELECT_MENU_USER];
			}
		});
	}

	onRouterLinkActive(test: any): void {
		console.log('onRouterLink', test);
	}

	logout() {
		this._authService.logout();
	}
	goTo(route: string) {
		switch (route) {
			case 'profile':
				// eslint-disable-next-line no-case-declarations
				this._navigateWithCompanyId(route);
				return;

			case 'cleantech-ecosolutions':
				// eslint-disable-next-line no-case-declarations
				this._navigateWithCompanyId(route);
				return;

			case 'sme-analysis/new':
				// eslint-disable-next-line no-case-declarations
				this._navigateWithCompanyIdInQueryParams(route, { smeId: this._companyId });
				return;

			default:
				this._router.navigate([route]);
				return;
		}
	}

	private _navigateWithCompanyId(route: string) {
		this._router.navigate([route, this._companyId]);
	}
	private _navigateWithCompanyIdInQueryParams(route: string, queryParams: any) {
		this._router.navigate([route], {
			queryParams: queryParams,
		});
	}
}
