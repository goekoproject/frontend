import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject, signal } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { Notification, ToastService } from './toast.service'

type RemoveToast = {
  [key: number]: boolean
}
@Component({
  selector: 'goeko-toast',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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
  public removing: RemoveToast = {}
  public removingAll = false
  ngOnInit(): void {
    this._getMessages()
  }

  private _getMessages() {
    this._toastService.messageSource.subscribe((newMessage) => {
      if (!newMessage) {
        return
      }
      window.scrollTo(0, 0)
      this.messages.update((message) => [...message, newMessage])
      this._removeAllToast()
    })
  }

  closeToast(index: number) {
    this.removing[index] = true
    setTimeout(() => {
      this._removeToast(index)
    }, 700)
  }

  private _removeToast(index: number) {
    this.messages.update((message) => message.filter((_, i) => i !== index))
  }
  private _removeAllToast() {
   this.removingAll = true
    setTimeout(() => {
      this.messages().forEach((_, index) => {
       this._removeToast(index)
      })
    }, 8000)
  }
}
