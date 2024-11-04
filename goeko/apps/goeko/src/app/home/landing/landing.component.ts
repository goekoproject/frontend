import { Component, effect, ElementRef, HostListener, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { ContentFulService } from '@goeko/store'
import { DialogService } from '@goeko/ui'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs'
import { HeaderService } from '../header/header.services'
import { HomeService } from '../home.service'
import { RequestDemoDialogComponent } from '../request-demo-dialog/request-demo-dialog.component'

enum ENTRYS_ID {
  MAIN = '6kOjxhcZv8tluQqyVzMglp',
  CONNECTING = '5K722xUKUczzRHt5COUgLp',
  SUSTAINABILITY = '2hwIsU3aiyyd2RhzFIgvw0',
  CONECCTION = '6E6IPYBP6rNkudS5oigmIF',
}
const CONTENT_TYPE_MAIN_PHOTO = 'mainPhoto'

@Component({
  selector: 'goeko-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'goeko-landing',
  },
})
export class LandingComponent implements OnInit {
  @ViewChild('goekoText') goekoText!: ElementRef

  @HostListener('animationstart', ['$event'])
  public onAnimationStart($event: any): void {
    this.showMainSlogan = true
  }

  @HostListener('animationend', ['$event'])
  public onAnimationEnd($event: any): void {
    this.goekoText.nativeElement.style.visibility = 'hidden'
  }

  private _contentFulService = inject(ContentFulService)
  public mainPhoto = toSignal(
    this._contentFulService
      .getContentType(CONTENT_TYPE_MAIN_PHOTO)
      .pipe(map((items) => (items?.items[0]?.fields['photo'] as { fields: { file: { url: string } } }).fields.file.url ?? '')),
  )

  public entryDataConnecting = this._homeService.entryDataConnecting
  public entryDataMain = this._homeService.entryDataMain
  public connection = this._homeService.connection

  currentLang!: string
  slogan!: { text: string }
  slogan2!: { text: string }
  showMainSlogan!: boolean

  constructor(
    private _homeService: HomeService,
    private _translate: TranslateService,
    private _dialogService: DialogService,
    private _router: Router,
    private _headerService: HeaderService,
  ) {
    effect(() => {
      console.log(this.mainPhoto())
    })
  }

  ngOnInit(): void {
    this._setTopScroll()
    this._setHeaderTheme()
    this.currentLang = this._translate.defaultLang
    this._homeService.getSloganSustainability(ENTRYS_ID.SUSTAINABILITY)
    this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
    this._homeService.getSloganMain(ENTRYS_ID.MAIN)
    this._homeService.geConnection(ENTRYS_ID.CONECCTION)
    this._onChangeLang()
  }

  private _onChangeLang() {
    this._translate.onLangChange.subscribe((res) => {
      this._homeService.getSloganConnecting(ENTRYS_ID.CONNECTING)
      this._homeService.getSloganMain(ENTRYS_ID.MAIN)
      this._homeService.geConnection(ENTRYS_ID.CONECCTION)
      this.currentLang = res.lang
    })
  }

  openRequestDemoDialog() {
    this._dialogService
      .open(RequestDemoDialogComponent)
      .afterClosed()
      .subscribe((isAccepted) => {})
  }

  goTologin() {
    this._router.navigate(['/login/signup'])
  }

  private _setTopScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  private _setHeaderTheme() {
    this._headerService.isDarkTheme.next(false)
  }
}
