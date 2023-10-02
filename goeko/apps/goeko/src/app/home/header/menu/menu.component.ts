import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MENU } from './menu.contants';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'goeko-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'menu',
	},
})
export class MenuComponent implements OnInit {
	langs = [
		/* 		{
			code: 'es',
			locale: 'es ',
		}, */
		{
			code: 'fr',
			title: 'LANGS.fr',
		},
		{
			code: 'gb',
			title: 'LANGS.gb',
		},
	];
	menu = MENU;
	defaultLang!: any;
	constructor(private translate: TranslateService) {}
	ngOnInit(): void {
		this.defaultLang = this.langs.find((lang) => lang.code === this.translate.getDefaultLang());
	}
	onChangeLangs(selectedLand: any) {
		this.translate.use(selectedLand.code);
	}
}
