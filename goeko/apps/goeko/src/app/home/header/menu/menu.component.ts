import { Component, effect, signal, ViewEncapsulation } from '@angular/core'
import { ContentFulService } from '@goeko/store'
import { AutoUnsubscribe } from '@goeko/ui'
import { map, Subject, takeUntil } from 'rxjs'
import { MENU } from './menu.contants'
import { IMenu } from './menu.interface'
import { _buildSubmenu } from './menu.util'

@AutoUnsubscribe()
@Component({
  selector: 'goeko-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'menu',
  },
})
export class MenuComponent {
  menu = signal<IMenu[]>(MENU)
  submenuOpen = signal(false)
  destroy$ = new Subject<void>()
  submenuOpenToggle = () => this.submenuOpen.update((value) => !value)

  constructor(private _contentFulService: ContentFulService) {
    effect(() => {
      if (this.submenuOpen()) {
        this._setSubmenuByMenu()
      }
    })
  }

  private _setSubmenuByMenu() {
    this._contentFulService
      .getContentType('contactsData')
      .pipe(
        takeUntil(this.destroy$),
        map((contatcsData: any) => contatcsData['items'].map((contactsFields: any) => contactsFields['fields'])),
      )
      .subscribe((data) => {
        this.menu.update((dataMenu) => [..._buildSubmenu(dataMenu, 'contact', data)])
      })
  }
}
