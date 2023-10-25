import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'go-badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		'(click)': 'onSelect(value)',
		'[attr.selected]': 'selected',
		'[attr.fill]': 'fill',
	},
})
export class BadgeComponent {
	@Input() value!: any;

	@Input() fill!: any;

	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onSelected$ = new EventEmitter();
	selected!: boolean;

	onSelect(value: any) {
		this.onSelected$.emit(this);
	}

	onSelected(selected: boolean) {
		this.selected = !selected;
	}
}
