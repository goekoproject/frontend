import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild} from '@angular/core'
import { ContentFulService } from '@goeko/store';
import { map } from 'rxjs';


const CONTENT_TYPE_CAROUSEL = 'carousel';


@Component({
  selector: 'go-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {



  @ViewChild('sliderTrack', { static: true }) slider!: ElementRef;
  private _contentFulService = inject(ContentFulService)
  public carousel$ = this._contentFulService.getContentType(CONTENT_TYPE_CAROUSEL).pipe(map((items) => items.items));
  carousel!: any;;

  constructor(private _renderer: Renderer2,
  ) {}


  ngOnInit(): void {
    this.carousel$.subscribe((items:any) => {
      this._loadCarousel(items);
     });
  }

  _loadCarousel(items: any) {
    let mapCompanies:any = [];
    items[0].fields.companies.forEach((element: any) => {
      mapCompanies.push(element.fields.file.url);
    });
    this.carousel = {
      numberCompanies: mapCompanies.length,
      timming: items[0].fields.timeSeconds,
      companies: mapCompanies
    }
    let bannerRepeat: number = this.carousel.numberCompanies * 2;
    let widthCalc:number= 250 * bannerRepeat;
    this._renderer.setStyle(this.slider?.nativeElement, 'width', `${widthCalc}px`);
    document.documentElement.style.setProperty('--home-slider-baner-companies', this.carousel.numberCompanies.toString());
    document.documentElement.style.setProperty('--home-slider-baner-time', this.carousel.timming + 's');
    console.log(this.carousel);
    console.log(bannerRepeat);
    console.log(widthCalc);


  }

}
