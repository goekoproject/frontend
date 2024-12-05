import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { HeaderService } from '../header/header.services';
import { Services } from './services.model';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';



const options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (node:any, next:any) => `<custom-paragraph>${next(node.content)}</custom-paragraph><br>`,
    [BLOCKS.PARAGRAPH]: (node:any, next:any) => `<custom-paragraph>${next(node.content)}</custom-paragraph><br>`
  },
   preserveWhitespace: true
}

const CONTENT_TYPE_ENTERPRISE = 'services';
const CONTENT_TYPE_CLEANTECH = 'cleanTechServices';

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
  public enterprise!: Services;
  public cleanTech!: Services;
  step = 'step1';

	constructor(
		public _translateServices: TranslateService,
		public route: ActivatedRoute,
    private _headerService: HeaderService
	) {
	}

	ngOnInit(): void {
    this._loadContent(CONTENT_TYPE_ENTERPRISE);
    this._loadContent(CONTENT_TYPE_CLEANTECH);
    this._setHeaderTheme();
    this._onChangeLang()
	}

  private _setHeaderTheme() {
    this._headerService.isDarkTheme.next(true);
  }

  private _loadContent(contentTypeService: string) {
    this.services$ = this._contentFulService.getContentType(contentTypeService).pipe(map((items) => items.items));
    this.services$.subscribe((items:any) => {
      contentTypeService === CONTENT_TYPE_ENTERPRISE ?
      this.enterprise = new Services(items[0]) : this.cleanTech = new Services(items[0])
    });
  }

  _returnHtmlFromRichText(richText: any) {
    if (richText === undefined || richText === null || richText.nodeType !== 'document') {
      return '<p>Error</p>';
    }
    return documentToHtmlString(richText, options);
}

  private _onChangeLang() {
    this._translateServices.onLangChange.subscribe((res) => {
      this.currentLangCode.set(res.lang)
      this._loadContent(CONTENT_TYPE_ENTERPRISE);
      this._loadContent(CONTENT_TYPE_CLEANTECH);
    })
  }

  _setTopScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   }

}
