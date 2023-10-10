import { Component, OnInit } from '@angular/core';
import { MENU_USER } from './menu-user.contants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, LANGS } from '@goeko/core';
import { Router } from '@angular/router';

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
	constructor(private translate: TranslateService, private _authService: AuthService, private _router: Router) {}
	ngOnInit(): void {
		this.defaultLang = this.langs.find((lang) => lang.code === this.translate.getDefaultLang());
		this.dataProfile = this._authService.getUserInfoToken();
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
				this._router.navigate(['profile', this.dataProfile.sub]);
				return;

			default:
				this._router.navigate([route]);
				return;
		}
	}
}
