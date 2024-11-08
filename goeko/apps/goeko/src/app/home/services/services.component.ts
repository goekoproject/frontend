import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { HeaderService } from '../header/header.services';
import { Services } from './services.model';

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
  public enterpriseServices!: Services;
  public cleanTechServices!: Services;
  step = 'step1';

	constructor(
		public _translateServices: TranslateService,
		public route: ActivatedRoute,
    private _headerService: HeaderService
	) {
	}

	ngOnInit(): void {
    this._loadContent(CONTENT_TYPE_ENTERPRISE_SERVICES);
    this._loadContent(CONTENT_TYPE_CLEANTECH_SERVICES);
    this._setHeaderTheme();
    this._onChangeLang()
	}

  private _setHeaderTheme() {
    this._headerService.isDarkTheme.next(true);
  }

   _loadContent(contentTypeService: string) {
    this.services$ = this._contentFulService.getContentType(contentTypeService).pipe(map((items) => items.items));
    this.services$.subscribe((items:any) => {
      contentTypeService === CONTENT_TYPE_ENTERPRISE_SERVICES ?
      this.enterpriseServices = new Services(items[0]) : this.cleanTechServices = new Services(items[0])
    });
  }

  private _onChangeLang() {
    this._translateServices.onLangChange.subscribe((res) => {
      this.currentLangCode.set(res.lang)
      this._loadContent(CONTENT_TYPE_ENTERPRISE_SERVICES);
      this._loadContent(CONTENT_TYPE_CLEANTECH_SERVICES);
    })
  }

}
