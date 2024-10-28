import { Component, ElementRef, inject, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'
import { CODE_LANG, LANGS } from '@goeko/core'
import { DialogService } from '@goeko/ui'
import { TranslateService } from '@ngx-translate/core'
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component'
import { HeaderService } from './header.services'

@Component({
  selector: 'goeko-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'goeko-header lg:max-w-screen-2xl w-[96%]',
  },
})
export class HeaderComponent implements OnInit {
  private _translate = inject(TranslateService)
  @ViewChild('header', { static: true }) header!: ElementRef
  @ViewChild('logo', { static: true }) logo!: ElementRef
  isDark!: any
  langs = LANGS.filter((lang) => lang.code !== CODE_LANG.ES)
  // @HostListener('window:scroll', ['$event'])
  // onScroll($event: any) {
  //   if (!this.header || !this.logo) return
  //   if (window.scrollY > 0) {
  //     // this._renderer.setStyle(this.header?.nativeElement, 'maxHeight', '6rem')
  //     // this._renderer.setStyle(this.logo?.nativeElement, 'width', '7%')
  //     this._renderer.setStyle(this.header?.nativeElement, 'background-color', '#052639')
  //   } else {
  //     // this._renderer.setStyle(this.header?.nativeElement, 'maxHeight', '10rem')
  //     // this._renderer.setStyle(this.logo?.nativeElement, 'width', '12%')
  //     this._renderer.setStyle(this.header?.nativeElement, 'background-color', 'transparent')
  //   }
  // }

  mobileMenuOpen = signal(false)
  constructor(
    private _router: Router,
    private _dialogService: DialogService,
    private _headerService: HeaderService,
  ) {}

  ngOnInit(): void {
    this._getHeaderTheme()
  }

  _getHeaderTheme() {
    this._headerService.isDarkTheme.subscribe((res) => {
      this.isDark = res
    })
  }

  goTologin() {
    this._router.navigate(['/login'])
  }

  setMobileMenuOpen() {
    this.mobileMenuOpen.update((value) => !value)
  }

  openRequestDemoDialog() {
    this._dialogService
      .open(RequestDemoDialogComponent)
      .afterClosed()
      .subscribe((isAccepted) => {})
  }
}
