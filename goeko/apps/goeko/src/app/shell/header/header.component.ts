import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'goeko-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
   host: {
    'class': 'goeko-header'
   }
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
