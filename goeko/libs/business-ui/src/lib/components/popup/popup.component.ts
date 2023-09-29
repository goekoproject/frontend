import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'go-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'go-popup',
	},
})
export class PopupComponent {
	@Input() body: string = 'text body';
	@Input() title: string = 'title body';

	@Input('text-main-button') textMainButton!: string;
	@Input('text-secondary-button') textSecondaryButton!: string;

	toggle!: boolean;

	confirm() {
		this.toggle = true;
	}
}
