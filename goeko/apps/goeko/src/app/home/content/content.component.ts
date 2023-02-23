import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as AOS from 'aos';
import { map } from 'rxjs';
import { HomeService } from '../home.service';
import { CONTENT } from './content.contants';
@Component({
	selector: 'go-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'go-content',
	},
})
export class ContentComponent implements OnInit {
	/* article: any; */
	articles!: Array<any>;
	otherContent = false;
	badStuffIcons = ['bolt', 'compost', 'unknown_document'];
	actorsImg = ['sme.jpg', 'cleantech.jpg', 'sme.jpg'];

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
	constructor(private _homeService: HomeService) {}

	ngOnInit(): void {
		AOS.init();
		window.addEventListener('load', AOS.refresh);
		this._getActors();
	}

	private _getActors() {
		this._homeService.getContentType('actor').subscribe((res) => {
			this.articles = res.map((actor: any) => ({
				...actor,
				benefits: this._buildDataLandingPage(actor.benefits),
			}));
		});
	}
}
