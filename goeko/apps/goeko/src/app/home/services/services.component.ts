import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { HeaderService } from '../header/header.services';

const CONTENT_TYPE_ENTERPRISE_SERVICES = 'services';

const CONTENT_TYPE_CLEANTECH_SERVICES = 'cleanTechServices';

@Component({
	selector: 'goeko-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {

  public currentLangCode = signal(this._translateServices.defaultLang)
  private _contentFulService = inject(ContentFulService)
  public services$:any;
	public title!: string;
	public text!: string;
  public enterpriseServices!: any;
  public cleanTechServices!: any;
  step : any = 'step1';

	constructor(
		public _translateServices: TranslateService,
		public route: ActivatedRoute,
    private _headerService: HeaderService
	) {
	}

	ngOnInit(): void {
    this._setTopScroll();
    this._loadContent(CONTENT_TYPE_ENTERPRISE_SERVICES);
    this._loadContent(CONTENT_TYPE_CLEANTECH_SERVICES);
    this._setHeaderTheme();
    this._onChangeLang()
	}

  private _setHeaderTheme() {
    this._headerService.isDarkTheme.next(true);
  }

  _setTopScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   }

   _loadContent(contentTypeService: any) {
    this.services$ = this._contentFulService.getContentType(contentTypeService).pipe(map((items) => items.items));
    this.services$.subscribe((items:any) => {
      // const rates: any = [];

      const paragraphDesc = this._getParagraphDescription(items[0].fields.description.content);

      const rates = this._getRates(items[0].fields.rates.content);



      contentTypeService === CONTENT_TYPE_ENTERPRISE_SERVICES ?
      this.enterpriseServices = {
        title: items[0].fields.title,
        actorType: items[0].fields.actorType,
        section: items[0].fields.section,
        paragraphs: paragraphDesc,
        photo: items[0].fields.photo.fields.file.url,
        rates: rates,
        rateTitle: items[0].fields.rateTitle
      }
      :
      this.cleanTechServices = {
        title: items[0].fields.title,
        actorType: items[0].fields.actorType,
        section: items[0].fields.section,
        paragraphs: paragraphDesc,
        photo: items[0].fields.photo.fields.file.url,
        rates: rates,
        rateTitle: items[0].fields.rateTitle
      }

    });
  }
  private _getRates(content: any): any[] {
    const rates: any= [];
    content.forEach((element: any) => {
        if(element.nodeType === 'embedded-entry-block'){
          const rateServiceList: any = [];
          const iconRateUrlList: any= [];
            element.data.target.fields.iconRate.forEach((element: any) => {
              iconRateUrlList.push(element.fields.file.url);
            });
            element.data.target.fields.serviceList.forEach((element: any) => {
              rateServiceList.push(element);
            });
            const rate = {
            icons: iconRateUrlList,
            title: element.data.target.fields.title,
            price: element.data.target.fields.price,
            rateServices: rateServiceList
          };
          rates.push(rate);
        }
      });
      return rates;
  }

  private _getParagraphDescription(content: any): any[] {
    const paragraphs: any = [];
    content.forEach((element: any) => {
      paragraphs.push(element.content[0].value);
    });
    return paragraphs;
  }

  private _onChangeLang() {
    this._translateServices.onLangChange.subscribe((res) => {
      this.currentLangCode.set(res.lang)
      this._loadContent(CONTENT_TYPE_ENTERPRISE_SERVICES);
      this._loadContent(CONTENT_TYPE_CLEANTECH_SERVICES);
    })
  }

}
