import { of } from 'rxjs';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, mergeAll, takeLast } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { BreadcrumbService } from './breadcrumb.service';
import { BreadCrumb } from './breadcrumbs.interface';

@Component({
	selector: 'go-breadcrumbs',
	templateUrl: './ui-breadcrumbs.component.html',
	styleUrls: ['./ui-breadcrumbs.component.scss'],
	// encapsulation: ViewEncapsulation.None
})
export class UiBreadcrumbsComponent implements OnInit {
	breadcrumbs$: Observable<BreadCrumb[]> = of([]);
	breadcrumbSectionSubtitle$!: Observable<string | null>;

	/**
	 * Get the last bredcrum for title page
	 */
	get lastBreadcrumb(): Observable<BreadCrumb> {
		return this.breadcrumbs$?.pipe(mergeAll(), takeLast(1));
	}
	get thirdToLast$(): Observable<BreadCrumb> {
		return this.breadcrumbs$?.pipe(mergeAll(), takeLast(2));

	}


	constructor(
		private activatedRoute: ActivatedRoute,
		private readonly _breadcrumbsService: BreadcrumbService,
		private router: Router,
		private location: Location
	) {
		this._routeChange();
		//this.breadcrumbSectionSubtitle$ = this._breadcrumbsService.getSectionSubtitle();
	}
	ngOnInit() {}
	/**
	 * Get data breadcrumbs when router changes
	 */
	private _routeChange() {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				distinctUntilChanged()
			)
			.subscribe(() => {
				this.breadcrumbs$ = this._breadcrumbsService.buildBreadCrumb(this.activatedRoute.root);
			});
	}
	goBack() {
		this.location.back();

	}
}
