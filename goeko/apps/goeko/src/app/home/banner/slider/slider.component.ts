import { Component, effect, ElementRef, inject, Renderer2, ViewChild } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ContentFulService } from '@goeko/store'
import { map } from 'rxjs'

const CONTENT_TYPE_CAROUSEL = 'carousel'
interface CarrouselContentFul {
  companies: any[]
  timeSeconds: number
  fields: { file: string; title: string }[]
}
@Component({
  selector: 'go-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  @ViewChild('sliderTrack', { static: true }) slider!: ElementRef
  private _contentFulService = inject(ContentFulService)
  public carousel = toSignal(
    this._contentFulService.getContentType(CONTENT_TYPE_CAROUSEL).pipe(
      map((items) => ({
        numberCompanies: (items.items[0].fields as unknown as CarrouselContentFul).companies.length,
        timming: (items.items[0].fields as unknown as CarrouselContentFul).timeSeconds,
        companies: (items.items[0].fields as unknown as CarrouselContentFul).companies.map((company) => ({
          ...company.fields,
          url: company.fields.file.url,
        })),
      })),
    ),
  )

  constructor(private _renderer: Renderer2) {
    effect(() => {
      console.log(this.carousel())
      if (this.carousel()) {
        this._loadCarousel(this.carousel())
      }
    })
  }

  _loadCarousel(items: any) {
    const bannerRepeat = items.numberCompanies * 2
    const widthCalc = 250 * bannerRepeat
    this._renderer.setStyle(this.slider?.nativeElement, 'width', `${widthCalc}px`)
    document.documentElement.style.setProperty('--home-slider-baner-companies', items.numberCompanies.toString())
    document.documentElement.style.setProperty('--home-slider-baner-time', items.timming + 's')
  }
}
