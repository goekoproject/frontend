import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDataContentFulComponent, ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { HeaderService } from '../header/header.services';

const CONTENT_TYPE_SERVICES = 'services';

@Component({
	selector: 'goeko-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {

  private _contentFulService = inject(ContentFulService)
  public services$ = this._contentFulService.getContentType(CONTENT_TYPE_SERVICES).pipe(map((items) => items.items));
	public title!: string;
	public text!: string;
  public services!: any;;
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
      items[0].fields.description.content.forEach((element: any) => {
        paragraphDesc.push(element.content[0].value);
      });
      this.services = {
        title: items[0].fields.title,
        section: items[0].fields.section,
        paragraphs: paragraphDesc,
        photo: items[0].fields.photo.fields.file.url
      }
    });
  }

}
