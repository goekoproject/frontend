import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';

@Directive({ selector: '[thumb]', standalone: true, exportAs: 'thumb' })
export class ThumbCarrouselDirective implements AfterViewInit {

    public emblaApiThumb!: EmblaCarouselType;
    constructor(private _el: ElementRef) {
       
     }

     ngAfterViewInit(): void {
        this.emblaApiThumb = EmblaCarousel(this._el.nativeElement, {
            containScroll: 'keepSnaps',
            dragFree: true
          })

     }
}