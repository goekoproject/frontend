/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'go-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'go-popup',
  },
})
export class PopupComponent {
  @Input() body: string = 'text body';
  @Input() title: string = 'title body';

  @Input() textMainButton!: string;
  @Input() textSecondaryButton!: string;

  @Output() onClickOK: EventEmitter<boolean> = new EventEmitter();
  @Output() onClickKO: EventEmitter<boolean> = new EventEmitter();

  toggle!: boolean;

  onOk() {
    this.toggle = true;
    this.onClickOK.emit(this.toggle);
  }

  onKo() {
    this.toggle = false;
    this.onClickKO.emit(this.toggle);
  }
}
