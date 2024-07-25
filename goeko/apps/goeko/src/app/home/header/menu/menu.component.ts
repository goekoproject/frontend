import { Component, OnInit, ViewEncapsulation, signal } from '@angular/core'
import { ContentFulService } from '@goeko/store'
import { map } from 'rxjs'
import { MENU } from './menu.contants'
import { IMenu } from './menu.interface'
import { _buildSubmenu } from './menu.util'

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
export class MenuComponent implements OnInit {
  menu = signal<IMenu[]>(MENU)
  submenuOpen = signal(false)
  submenuOpenToggle = () => this.submenuOpen.update((value) => !value)

  constructor(private _contentFulService: ContentFulService) {}
  ngOnInit(): void {
    this._setSubmenuByMenu()
  }

  private _setSubmenuByMenu() {
    this._contentFulService
      .getContentType('contactsData')
      .pipe(map((contatcsData: any) => contatcsData['items'].map((contactsFields: any) => contactsFields['fields'])))
      .subscribe((data) => {
        this.menu.update((dataMenu) => [..._buildSubmenu(dataMenu, 'contact', data)])
      })
  }
}
