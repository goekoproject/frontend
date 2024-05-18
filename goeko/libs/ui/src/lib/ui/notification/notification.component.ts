import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationService } from './notification.services';
@Component({
  selector: 'go-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'notification',
    '[attr.type]': 'type',
    '[attr.appearance]': 'appearance',
  },
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() type = 'info' || 'warning' || 'error';
  @Input() appearance = 'fill' || 'flat';
  @Output() close$ = new EventEmitter();

  public notificationData$ = this._notificationService.data; 
  constructor(private _notificationService: NotificationService) {}

  ngOnInit(): void {
	this._setNotificationConfig();
  }

  private _setNotificationConfig() {
    this._notificationService.config.subscribe((config) => {
      (this.type = config.type), (this.appearance = config.appearance);
    });
  }

ngOnDestroy(): void {
  this._notificationService.data.next(null);
  this._notificationService.data.complete();
}
}
