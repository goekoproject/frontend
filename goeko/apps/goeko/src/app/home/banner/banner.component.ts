import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core'
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

  private get urlSrcVideo() {
    if (this.currentLangCode() === 'fr') {
      return 'https://res.cloudinary.com/hqsjddtpo/video/upload/f_auto:video,q_auto/v1/landing-page/cuunnjgjchyenhrrfovf'
    }
    return `https://res.cloudinary.com/hqsjddtpo/video/upload/f_auto:video,q_auto/v1/landing-page/goeko-info-${this.currentLangCode()}#t=40`
  }
  constructor(private _translateServices: TranslateService) {}

  ngAfterViewInit(): void {
    if (!this.marketingVideo) {
      return
    }
    this.marketingVideo.nativeElement.muted = true
    this.marketingVideo.nativeElement.src = this.urlSrcVideo
  }

  ngOnInit(): void {
    this._changeLangCode()
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((res) => {
      this.currentLangCode.set(res.lang)
      this.marketingVideo.nativeElement.src = this.urlSrcVideo

      if (this.isMobileOrTablet()) {
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

  private isMobileOrTablet(): boolean {
    const userAgent = navigator.userAgent
    return /android|iPad|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  }
}
