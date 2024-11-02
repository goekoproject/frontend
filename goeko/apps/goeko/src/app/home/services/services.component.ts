import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { HeaderService } from '../header/header.services';

const CONTENT_TYPE_SERVICES = 'services';

const CONTENT_TYPE_CTSERVICES = 'cleanTechServices';

@Component({
	selector: 'goeko-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {

  public currentLangCode = signal(this._translateServices.defaultLang)
  private _contentFulService = inject(ContentFulService)
  // public services$ = this._contentFulService.getContentType(CONTENT_TYPE_SERVICES).pipe(map((items) => items.items));
  // public CTservices$ = this._contentFulService.getContentType(CONTENT_TYPE_CTSERVICES).pipe(map((items) => items.items));

  public services$:any;
  public CTservices$:any;

	public title!: string;
	public text!: string;
  public services!: any;
  public CTservices!: any;

  step : any = 'step1';

	constructor(
		public _translateServices: TranslateService,
		public route: ActivatedRoute,
    private _headerService: HeaderService
	) {
	}

	ngOnInit(): void {
    this._setTopScroll();
    this._loadContentFulServices();
    this._loadContentFulCTServices();
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

  _loadContentFulServices() {
    this.services$ = this._contentFulService.getContentType(CONTENT_TYPE_SERVICES).pipe(map((items) => items.items));
    this.services$.subscribe((items:any) => {
      console.log(items);
      const paragraphDesc:any = [];
      const rates:any = [];

      items[0].fields.description.content.forEach((element: any) => {
        paragraphDesc.push(element.content[0].value);
      });

      items[0].fields.rates.content.forEach((element: any) => {
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
      this.services = {
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

  _loadContentFulCTServices() {
    this.CTservices$ = this._contentFulService.getContentType(CONTENT_TYPE_CTSERVICES).pipe(map((items) => items.items));
    this.CTservices$.subscribe((items:any) => {
      const paragraphDesc:any = [];
      const rates:any = [];

      items[0].fields.description.content.forEach((element: any) => {
        paragraphDesc.push(element.content[0].value);
      });

      items[0].fields.rates.content.forEach((element: any) => {
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
      this.CTservices = {
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

  private _onChangeLang() {
    this._translateServices.onLangChange.subscribe((res) => {
      this.currentLangCode.set(res.lang)
      this._loadContentFulServices();
      this._loadContentFulCTServices();
    })
  }

}
