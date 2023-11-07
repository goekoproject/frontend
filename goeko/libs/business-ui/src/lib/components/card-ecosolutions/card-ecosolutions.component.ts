/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'goeko-card-ecosolutions',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card-ecosolutions.component.html',
	styleUrls: ['./card-ecosolutions.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'card-ecosolutions',
	},
})
export class CardEcosolutionsComponent implements OnInit {
	@Input() solutionName: string = 'Vertua Ultra Zero';
	@Input() products: string[] = ['Plastics,Concrete,Cement Lighting,Building materials,Electrical machinery'];
	@Input() sustainableDevelopmentGoals: number[] = [17, 9, 6];

	currentLangCode!: string;

	constructor(private _translateServices: TranslateService) {}

	ngOnInit(): void {
		this.currentLangCode = this._translateServices.defaultLang;
		this._changeLangCode();
	}

	private _changeLangCode() {
		this._translateServices.onLangChange.subscribe((res) => (this.currentLangCode = res.lang));
	}
}
