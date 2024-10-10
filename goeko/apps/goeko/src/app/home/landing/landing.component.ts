import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.services';

@Component({
	selector: 'goeko-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit{

  constructor(
    private _headerService: HeaderService
	) {
	}

  ngOnInit(): void {
   this._setTopScroll();
   this._setHeaderTheme();
  }

  private _setTopScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   }

   private _setHeaderTheme() {
    this._headerService.isDarkTheme.next(false);
  }
}
