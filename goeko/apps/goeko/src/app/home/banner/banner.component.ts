import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'go-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements AfterViewInit, OnInit {
  public currentLangCode!: string;
  @ViewChild('marketingVideo') marketingVideo!: ElementRef<HTMLMediaElement>;
  public odsIcon = [6, 7, 9, 11, 12, 13, 14, 15];

  constructor(private _translateServices: TranslateService) {}

  ngAfterViewInit(): void {
    if (!this.marketingVideo) {
      return;
    }
    this.marketingVideo.nativeElement.muted = true;
  }

  ngOnInit(): void {
    this.currentLangCode = this._translateServices.defaultLang;
    this._changeLangCode();
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe(
      (res) => (this.currentLangCode = res.lang)
    );
  }
  watchVideo() {
    this.marketingVideo.nativeElement.currentTime = 0.00;
    this.marketingVideo.nativeElement.requestFullscreen();
    this.marketingVideo.nativeElement.controls = 
    this.marketingVideo.nativeElement.controls = true;
    this.marketingVideo.nativeElement.play();
  }
}
