import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'go-title-page',
	templateUrl: './title-page.component.html',
	styleUrls: ['./title-page.component.scss'],
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'go-title-page',
		'[attr.size]': 'fontSize',
	},
})
export class TitlePageComponent {
	@Input('size')
	public get fontSize(): string {
		return this._fontSize;
	}
	public set fontSize(value: string) {
		this._fontSize = value;
	}

	private _fontSize = 'huge';
}
