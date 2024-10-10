import { Component, ElementRef, HostListener, OnInit, Renderer2, signal, ViewChild, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'
import { LANGS } from '@goeko/core'
import { DialogService } from '@goeko/ui'
import { TranslateService } from '@ngx-translate/core'
import { TermsOfServicesComponent } from '../../access/signup/terms-of-services.component'
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component'

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
  @ViewChild('header', { static: true }) header!: ElementRef
  @ViewChild('logo', { static: true }) logo!: ElementRef

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

  langs = LANGS
  defaultLang!: any
  mobileMenuOpen = signal(false)
  constructor(
    private _renderer: Renderer2,
    private translate: TranslateService,
    private _router: Router,
    private _dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.defaultLang = this.langs.find((lang) => lang.code === this.translate.getDefaultLang())
  }
  onChangeLangs(selectedCodeLand: string) {
    this.translate.use(selectedCodeLand)
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
      .subscribe((isAccepted) => {
      })
  }
}
