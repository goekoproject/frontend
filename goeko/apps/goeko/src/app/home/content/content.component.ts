import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { map } from 'rxjs';
import { InteractionService } from '../banner/scenes/interaction.service';
import { HomeService } from '../home.service';
import { CONTENT } from './content.contants';
@Component({
	selector: 'go-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ContentComponent implements OnInit {
	@ViewChildren('content') articlesRef!: QueryList<ElementRef>;
	/* article: any; */
	articles!: Array<any>;
	otherContent = false;
	badStuffIcons = ['bolt', 'compost', 'unknown_document'];
	actorsImg = ['bank.jpg', 'sme.jpg', 'cleantech.jpg'];

	private _body: any;

	public content = CONTENT;

	private _searchEntry$ = (entryId: any) => {
		console.log(entryId);
		return this._homeService.getEntry(entryId).pipe(map((benefits: any) => this._buildBenefis(benefits)));
	};

	private _buildBenefis = (benefit: any) => {
		return {
			...benefit.fields,
			media: benefit.fields.media.fields.file,
		};
	};

	private _buildDataLandingPage = (data?: any): Array<any> => {
		return data.content
			.filter((b: any) => b.data.target?.fields)
			.map((benefits: any) => benefits.data.target.fields);
	};
	constructor(
		private _homeService: HomeService,
		private _router: Router,
		private _interactionService: InteractionService,
		private _viewportScroller: ViewportScroller
	) {}

	ngOnInit(): void {
		AOS.init();
		window.addEventListener('load', AOS.refresh);
		this._getActors();
		this._onClickSme();
		this._onClickCleanTeach();
		this._oBank();
	}

	private _onClickSme() {
		this._interactionService.onSMEClick.subscribe((res) => {
			this._router.navigate(['/home'], { fragment: 'sme' });
			/* 			window.scroll(0, window.scrollY + 1000);
			 */
		});
	}

	private _onClickCleanTeach() {
		this._interactionService.onCleanTeachClick.subscribe((res) => {
			this._router.navigate(['/home'], { fragment: 'cleantech' });
			/* 			window.scroll(0, window.scrollY + 1000);
			 */
		});
	}

	private _oBank() {
		this._interactionService.onBankClick.subscribe((res) => {
			this._router.navigate(['/home'], { fragment: 'bank' });
			/* 			window.scroll(0, window.scrollY + 1000);
			 */
		});
	}

	private _getActors() {
		this._homeService.getContentType('actor').subscribe((res) => {
			this.articles = res.map((actor: any) => ({
				...actor,
				id: actor.name.trim().toLowerCase(),
				benefits: this._buildDataLandingPage(actor.benefits),
			}));
		});
	}
}
