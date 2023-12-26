import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MENU } from './menu.contants';
import { TranslateService } from '@ngx-translate/core';

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
  menu = MENU;
  constructor() {}
  ngOnInit(): void {}
}
