import { Component, ElementRef, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'
import { CODE_LANG, LANGS } from '@goeko/core'
import { DialogService } from '@goeko/ui'
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component'
import { HeaderService } from './header.services'

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
export class HeaderComponent implements OnInit {
  @ViewChild('header', { static: true }) header!: ElementRef
  @ViewChild('logo', { static: true }) logo!: ElementRef
  isDark!: boolean
  langs = LANGS.filter((lang) => lang.code !== CODE_LANG.ES && lang.code !== CODE_LANG.DE)
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
    this._headerService.isDarkTheme.subscribe((res: boolean) => {
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
