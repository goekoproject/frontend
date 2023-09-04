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
		{
			code: 'es',
		},
		{
			code: 'fr',
		},
		{
			code: 'gb',
		},
	];
	menu = MENU;
	defaultLang!: string;
	constructor(private translate: TranslateService) {}
	ngOnInit(): void {
		this.defaultLang = this.translate.getDefaultLang();
	}
	onChangeLangs(selectedLand: any) {
		this.translate.use(selectedLand.code);
	}
}
