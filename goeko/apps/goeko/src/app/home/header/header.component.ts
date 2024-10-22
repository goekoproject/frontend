import { Component, ElementRef, HostListener, Renderer2, signal, ViewChild, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'
import { LANGS } from '@goeko/core'

@Component({
  selector: 'goeko-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'goeko-header',
  },
})
export class HeaderComponent {
  @ViewChild('header', { static: true }) header!: ElementRef
  @ViewChild('logo', { static: true }) logo!: ElementRef

  @HostListener('window:scroll', ['$event'])
  onScroll($event: any) {
    if (!this.header || !this.logo) return
    if (window.scrollY > 0) {
      this._renderer.setStyle(this.header?.nativeElement, 'maxHeight', '6rem')
      this._renderer.setStyle(this.logo?.nativeElement, 'width', '7%')
    } else {
      this._renderer.setStyle(this.header?.nativeElement, 'maxHeight', '10rem')
      this._renderer.setStyle(this.logo?.nativeElement, 'width', '12%')
    }
  }

  langs = LANGS
  defaultLang!: any
  mobileMenuOpen = signal(false)
  constructor(
    private _renderer: Renderer2,
    private _router: Router,
  ) {}

  goTologin() {
    this._router.navigate(['/login'])
  }

  setMobileMenuOpen() {
    this.mobileMenuOpen.update((value) => !value)
  }
}
