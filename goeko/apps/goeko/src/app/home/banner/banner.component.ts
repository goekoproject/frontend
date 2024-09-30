import { Advantages } from './advantages.model';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ContentFulService } from '@goeko/store'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs';

const CONTENT_TYPE_GOEKO_ADVANTAGES = 'advantagesGoeko';

@Component({
  selector: 'go-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements AfterViewInit, OnInit {
  private _contentFulService = inject(ContentFulService)
  public currentLangCode = signal(this._translateServices.defaultLang)

  public advantages$ = this._contentFulService.getContentType(CONTENT_TYPE_GOEKO_ADVANTAGES).pipe(map((items) => items.items));
  advantages!: Advantages[];

  @ViewChild('marketingVideo') marketingVideo!: ElementRef<HTMLMediaElement>

  public odsIcon = [6, 7, 9, 11, 12, 13, 14, 15]

  private get urlSrcVideo() {
    if (this.currentLangCode() === 'fr') {
      return 'https://res.cloudinary.com/hqsjddtpo/video/upload/f_auto:video,q_auto/v1/landing-page/cuunnjgjchyenhrrfovf'
    }
    return `https://res.cloudinary.com/hqsjddtpo/video/upload/f_auto:video,q_auto/v1/landing-page/goeko-info-${this.currentLangCode()}#t=40`
  }


  constructor(private _translateServices: TranslateService) {}

  ngOnInit(): void {
    this._changeLangCode();;
   this.advantages$.subscribe((items:any) => {
    this.advantages = [];
    items.forEach((element: any) => {
      this.advantages.push(new Advantages(element));
    });
   });
  }

  ngAfterViewInit(): void {
    if (!this.marketingVideo) {
      return
    }
    this.marketingVideo.nativeElement.muted = true
    this.marketingVideo.nativeElement.src = this.urlSrcVideo
  }

  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((res) => {
      this.currentLangCode.set(res.lang)
      this.marketingVideo.nativeElement.src = this.urlSrcVideo
    })
  }
  watchVideo() {
    this.marketingVideo.nativeElement.currentTime = 0.0
    this.marketingVideo.nativeElement.requestFullscreen()
    this.marketingVideo.nativeElement.controls = this.marketingVideo.nativeElement.controls = true
    this.marketingVideo.nativeElement.play()
  }
}
