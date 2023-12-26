import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'go-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('marketingVideo') marketingVideo!: ElementRef<HTMLMediaElement>;
  public odsIcon = [6, 7, 9, 11, 12, 13, 14, 15];

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.marketingVideo) {
      return;
    }
    this.marketingVideo.nativeElement.muted = true;
  }

  watchVideo() {
    /*     this._renderer.addClass(this.marketingVideo.nativeElement, 'watch-video');
     */
    this.marketingVideo.nativeElement.requestFullscreen();

    this.marketingVideo.nativeElement.controls = true;
    this.marketingVideo.nativeElement.play();
  }
}
