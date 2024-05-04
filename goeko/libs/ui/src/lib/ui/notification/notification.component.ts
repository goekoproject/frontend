
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'go-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'notification',
		'[attr.type]':'type',
		'[attr.appearance]': 'appearance',
	},
})
export class NotificationComponent {
	@Input() type = 'info' || 'warning' || 'error';
	@Input() appearance = 'fill' || 'flat'
	@Output() close$ = new EventEmitter();
}
