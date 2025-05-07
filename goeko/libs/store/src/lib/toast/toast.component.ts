import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, inject, signal } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { distinctUntilChanged, map } from 'rxjs'
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
    '[attr.static]': 'static',
    '[attr.open]': 'messages() && messages().length > 0',
  },
})
export class ToastComponent implements OnInit {
  private _toastService = inject(ToastService)

  @Input() static = false
  public messages = signal<Array<Notification | null>>([])
  public removing: RemoveToast = {}
  public removingAll = false

  ngOnInit(): void {
    this._getMessages()
  }

  private _getMessages() {
    this._toastService.messageSource
      .pipe(
        distinctUntilChanged((prev, curr) => prev?.type === curr?.type && prev?.message === curr?.message),
        map((newMessage) => {
          if (!newMessage) return
          this.messages.update((message) => [...message, newMessage])
          this._removeAllToast()
        }),
      )
      .subscribe()
  }

  closeToast(index: number) {
    this.removing[index] = true
    setTimeout(() => {
      this._removeToast(index)
    }, 600)
  }

  private _removeToast(index: number) {
    this.messages.update((message) => message.filter((_, i) => i !== index))
  }
  private _removeAllToast() {
    if (this.static) {
      return
    }
    this.removingAll = true
    setTimeout(() => {
      this.messages().forEach((_, index) => {
        this._removeToast(index)
      })
    }, 900)
  }
}
