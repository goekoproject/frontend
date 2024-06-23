import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject, signal } from '@angular/core'
import { Notification, ToastService } from './toast.service'

@Component({
  selector: 'goeko-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'goeko-toast',
  },
})
export class ToastComponent implements OnInit {
  private _toastService = inject(ToastService)

  public messages = signal<Array<Notification | null>>([])
  public removing: any = {}

  ngOnInit(): void {
    this._getMessages()
  }

  private _getMessages() {
    this._toastService.messageSource.subscribe((newMessage) => {
      if(!newMessage) {
        return;
      }
      this.messages.update((message) => [...message, newMessage])
    })
  }

  closeToast(index: number) {
    this.removing[index] = true
    setTimeout(() => {
      this._removeToast(index)
    }, 300)
  }

  private _removeToast(index: number) {
    this.messages.update((message) => message.filter((_, i) => i !== index))
  }
}
