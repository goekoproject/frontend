import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'go-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'notification',
	},
})
export class NotificationComponent {
	@Input() type = 'info' || 'warning' || 'error';
	@Output() close$ = new EventEmitter();
}
