import { MediaMatcher } from '@angular/cdk/layout'
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core'
import { CODE_LANG } from '@goeko/core'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs'
import { Advantages } from './advantages.model'
import { ContentFulService } from '@goeko/store'

const CONTENT_TYPE_GOEKO_ADVANTAGES = 'advantagesGoeko'

@Component({
  selector: 'go-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements AfterViewInit, OnInit {
  private _contentFulService = inject(ContentFulService)
  public currentLangCode = signal(this._translateServices.defaultLang)

  public advantages$!:any;

  advantages!: Advantages[]

  @ViewChild('marketingVideo') marketingVideo!: ElementRef<HTMLMediaElement>

  public odsIcon = [6, 7, 9, 11, 12, 13, 14, 15]

  public srcVideo = signal(this.urlSrcVideo)
  public isSmailScreen = signal(this._mediaMatcher.matchMedia('(max-width: 599.98px)'))

  private get urlSrcVideo() {
    if (this.currentLangCode() === CODE_LANG.FR) {
      return 'https://res.cloudinary.com/hqsjddtpo/video/upload/f_auto:video,q_auto/v1/landing-page/info-fr'
    }
    return `https://res.cloudinary.com/hqsjddtpo/video/upload/f_auto:video,q_auto/v1/landing-page/goeko-info-${this.currentLangCode()}#t=40`
  }

  constructor(
    private _translateServices: TranslateService,
    private _mediaMatcher: MediaMatcher,
  ) {}

  ngOnInit(): void {
    this._changeLangCode()
    this.loadAdvantages();
  }

  loadAdvantages() {
    this.advantages$ = this._contentFulService.getContentType(CONTENT_TYPE_GOEKO_ADVANTAGES).pipe(map((items) => items.items))

    this.advantages$.subscribe((items: any) => {
      this.advantages = []
      items.forEach((element: any) => {
        this.advantages.push(new Advantages(element))
      })
    })  }

  ngAfterViewInit(): void {
    if (!this.marketingVideo) {
      return
    }
    this.marketingVideo.nativeElement.muted = true
    if (!this.isSmailScreen().matches) {
      this.marketingVideo.nativeElement.autoplay = true
    }
  }

  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((res) => {
      this.currentLangCode.set(res.lang)
      this.srcVideo.set(this.urlSrcVideo)
      if (this.isSmailScreen().matches) {
        this.marketingVideo.nativeElement.pause()
      }
      this.loadAdvantages();
    })
  }
  watchVideo() {
    this.marketingVideo.nativeElement.currentTime = 0.0
    this.marketingVideo.nativeElement.requestFullscreen()
    this.marketingVideo.nativeElement.controls = this.marketingVideo.nativeElement.controls = true
    this.marketingVideo.nativeElement.play()
  }
}
