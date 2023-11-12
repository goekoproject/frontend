/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */

import { Directive, Input } from '@angular/core';

type appearance = 'transparent' | 'primary' | 'secondary' | 'white' | 'any' | 'link' | null;
type size = 'huge' | 'medium';

@Directive({
	selector: '[go-button], [go-button-icon]',
	host: {
		class: 'go-button',
		'[attr.appearance]': 'appearance',
		'[attr.size]': 'size',
	},
})
export class ButtonDirective {
	@Input('appearance')
	public get appearance(): appearance {
		return this._appearance;
	}
	public set appearance(value: appearance) {
		this._appearance = value;
	}
	private _appearance!: appearance;

	@Input('size')
	public get size(): size {
		return this._size;
	}
	public set size(value: size) {
		this._size = value;
	}
	private _size!: size;
}
