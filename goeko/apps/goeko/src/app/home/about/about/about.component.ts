import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDataContentFulComponent, ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

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
		public route: ActivatedRoute
	) {
		super(contentFulService, translate, route);
	}

	ngOnInit(): void {
		this.content$.subscribe((content) => ((this.title = content.title), (this.text = content.text)));
	}
}
