import { Component, OnInit } from '@angular/core';
import { LANGS, Lang } from '@goeko/core';
import { UserService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'goeko-header-user',
	templateUrl: './header-user.component.html',
	styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
	langs = LANGS;
	public toogleSideProfile!: boolean;
	public dataUser!: any;
	defaultLang!: Lang;

	constructor(private _userService: UserService, private _translate: TranslateService) {}

	ngOnInit(): void {
		this.defaultLang = this.langs.find((lang) => lang.code === this._translate.getDefaultLang()) as Lang;
		this._getDataProfile();
	}

	private _getDataProfile(): any {
		this._userService.companyDetail.subscribe((company: any) => {
			if (company) {
				this.dataUser = company;
			}
		});
	}
	onChangeLangs(selectedLand: any) {
		this._translate.use(selectedLand.code);
	}

	toogleProfile(toogle: boolean): void {
		this.toogleSideProfile = toogle;
	}
}
