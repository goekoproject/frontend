import { Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { MENU } from './menu.contants';
import { ContentFulService } from '@goeko/store';
import { map } from 'rxjs';
import { IMenu } from './menu.interface';

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
  
  private _buildSubmenu = (menu: IMenu[], code: string, submenu: any) =>
    menu.map((item) => {
      return item.code === code
        ? ({
            ...item,
            submenu,
          } as IMenu)
        : item;
    });

  menu = signal<IMenu[]>(MENU);
  constructor(private _contentFulService: ContentFulService) {}
  ngOnInit(): void {
    this._setSubmenuByMenu();
  }

  private _setSubmenuByMenu() {
    this._contentFulService
      .getContentType('contactsData')
      .pipe(
        map((contatcsData: any) =>
          contatcsData['items'].map(
            (contactsFields: any) => contactsFields['fields']
          )
        )
      )
      .subscribe((data) => {
        this.menu.update((dataMenu) => [
          ...this._buildSubmenu(dataMenu, 'contact', data),
        ]);
      });
  }
}
