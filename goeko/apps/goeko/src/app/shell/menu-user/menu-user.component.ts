import { Component, OnInit } from '@angular/core';
import { MENU_USER } from './menu-user.contants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, LANGS } from '@goeko/core';

@Component({
	selector: 'goeko-menu-user',
	templateUrl: './menu-user.component.html',
	styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {
	langs = LANGS;
	defaultLang!: any;
	public menuOptions = MENU_USER;

	constructor(private translate: TranslateService, private _authService: AuthService) {}
	ngOnInit(): void {
		this.defaultLang = this.langs.find((lang) => lang.code === this.translate.getDefaultLang());
	}

	onChangeLangs(selectedLand: any) {
		this.translate.use(selectedLand.code);
	}

	logout() {
		this._authService.logout();
	}
}
