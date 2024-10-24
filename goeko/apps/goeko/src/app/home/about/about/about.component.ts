import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDataContentFulComponent, ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from '../../header/header.services';

@Component({
	selector: 'goeko-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends BaseDataContentFulComponent implements OnInit {
	public title!: string;
	public text!: string;

	constructor(
		public contentFulService: ContentFulService,
		public translate: TranslateService,
		public route: ActivatedRoute,
    private _headerService: HeaderService
	) {
		super(contentFulService, translate, route);
	}

	ngOnInit(): void {
		this.content$.subscribe((content) => ((this.title = content.title), (this.text = content.text)));
    this._setHeaderTheme();
    this._setTopScroll();
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
}
