import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDataContentFulComponent, ContentFulService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'goeko-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
	public title!: string;
	public text!: string;

	constructor(
		public contentFulService: ContentFulService,
		public translate: TranslateService,
		public route: ActivatedRoute
	) {
	}

	ngOnInit(): void {
	}

}
