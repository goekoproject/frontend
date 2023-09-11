import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'goeko-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'goeko-header',
	},
})
export class HeaderComponent implements OnInit {
	@ViewChild('header', { static: true }) header!: ElementRef;
	@ViewChild('logo', { static: true }) logo!: ElementRef;

	@HostListener('window:scroll', ['$event'])
	onScroll($event: any) {
		if (window.scrollY > 0) {
			this._renderer.setStyle(this.header.nativeElement, 'maxHeight', '6rem');
			this._renderer.setStyle(this.logo.nativeElement, 'width', '7%');
		} else {
			this._renderer.setStyle(this.header.nativeElement, 'maxHeight', '10rem');
			this._renderer.setStyle(this.logo.nativeElement, 'width', '12%');
		}
	}

	constructor(private _renderer: Renderer2) {}

	ngOnInit(): void {}
}
