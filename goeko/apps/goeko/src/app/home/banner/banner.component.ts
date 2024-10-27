import { MediaMatcher } from '@angular/cdk/layout'
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core'
import { CODE_LANG } from '@goeko/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'go-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements AfterViewInit, OnInit {
  public currentLangCode = signal(this._translateServices.defaultLang)
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

  ngAfterViewInit(): void {
    if (!this.marketingVideo) {
      return
    }
    this.marketingVideo.nativeElement.muted = true
  }

  ngOnInit(): void {
    this._changeLangCode()
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((res) => {
      this.currentLangCode.set(res.lang)
      this.srcVideo.set(this.urlSrcVideo)
      if (this.isSmailScreen().matches) {
        this.marketingVideo.nativeElement.pause()
      }
    })
  }
  watchVideo() {
    this.marketingVideo.nativeElement.currentTime = 0.0
    this.marketingVideo.nativeElement.requestFullscreen()
    this.marketingVideo.nativeElement.controls = this.marketingVideo.nativeElement.controls = true
    this.marketingVideo.nativeElement.play()
  }
}
