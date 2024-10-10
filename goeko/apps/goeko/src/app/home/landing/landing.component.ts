import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'goeko-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit{

  ngOnInit(): void {
   this._setTopScroll();
  }

  _setTopScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   }
}
