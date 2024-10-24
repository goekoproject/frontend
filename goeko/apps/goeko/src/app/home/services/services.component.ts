import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDataContentFulComponent, ContentFulService } from '@goeko/store';
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

  private _contentFulService = inject(ContentFulService)
  public services$ = this._contentFulService.getContentType(CONTENT_TYPE_SERVICES).pipe(map((items) => items.items));
  public CTservices$ = this._contentFulService.getContentType(CONTENT_TYPE_CTSERVICES).pipe(map((items) => items.items));

	public title!: string;
	public text!: string;
  public services!: any;
  public CTservices!: any;;

  step : any = 'step1';

	constructor(
		public translate: TranslateService,
		public route: ActivatedRoute,
    private _headerService: HeaderService
	) {
	}

	ngOnInit(): void {
    this._setTopScroll();
    this._loadContentFulServices();
    this._loadContentFulCTServices();
    this._setHeaderTheme();
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
    this.services$.subscribe((items:any) => {
      console.log(items);
      let paragraphDesc:any = [];
      let rates:any = [];

      items[0].fields.description.content.forEach((element: any) => {
        paragraphDesc.push(element.content[0].value);
      });

      items[0].fields.rates.content.forEach((element: any) => {
        if(element.nodeType === 'embedded-entry-block'){
          let rateServiceList: any = [];
          let iconRateUrlList: any= [];
            element.data.target.fields.iconRate.forEach((element: any) => {
              iconRateUrlList.push(element.fields.file.url);
            });
            element.data.target.fields.serviceList.forEach((element: any) => {
              rateServiceList.push(element);
            });
          let rate = {
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
        section: items[0].fields.section,
        paragraphs: paragraphDesc,
        photo: items[0].fields.photo.fields.file.url,
        rates: rates
      }
    });
  }

  _loadContentFulCTServices() {
    this.CTservices$.subscribe((items:any) => {
      let paragraphDesc:any = [];
      let rates:any = [];

      items[0].fields.description.content.forEach((element: any) => {
        paragraphDesc.push(element.content[0].value);
      });

      items[0].fields.rates.content.forEach((element: any) => {
        if(element.nodeType === 'embedded-entry-block'){
          let rateServiceList: any = [];
          let iconRateUrlList: any= [];
            element.data.target.fields.iconRate.forEach((element: any) => {
              iconRateUrlList.push(element.fields.file.url);
            });
            element.data.target.fields.serviceList.forEach((element: any) => {
              rateServiceList.push(element);
            });
          let rate = {
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
        section: items[0].fields.section,
        paragraphs: paragraphDesc,
        photo: items[0].fields.photo.fields.file.url,
        rates: rates
      }
    });
  }

}
