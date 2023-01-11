import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MENU } from './menu.contants';

@Component({
  selector: 'goeko-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'menu'
  }
})
export class MenuComponent implements OnInit{

  menu = MENU
  ngOnInit(): void {
      
  }
}
