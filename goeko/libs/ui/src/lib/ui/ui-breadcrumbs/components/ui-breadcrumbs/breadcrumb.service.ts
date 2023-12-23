import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { BreadCrumb } from './breadcrumbs.interface';

interface BreadCrumbData {
	breadcrumb: string;
	infoLink: string;
	hidden: boolean;
	keyParams: string[];
	onBack?: boolean;
}
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
	private readonly sectionSubtitle$ = new Subject<string>();
	// constructor() {
	constructor() {}

	/**
	 * Build breadcrumb when router changes
	 * @param route
	 * @param url
	 * @param breadcrumbs
	 * @returns
	 */
	buildBreadCrumb(
		route: ActivatedRoute,
		url: string = '',
		breadcrumbs: Array<BreadCrumb> = []
	): Observable<BreadCrumb[]> {
		let newBreadcrumbs: Array<BreadCrumb> = [];
		let nextUrl = '';

		if (route.routeConfig) {
			const breadCrumbData: BreadCrumbData = route.routeConfig.data as BreadCrumbData;
			const pathParams =
				Object.entries(route.snapshot?.params)
					.map(([key, value]) => `${value}`)
					.toString()
					.replace(',', '/') || '';

			let path = route.routeConfig.path;
			if (pathParams && path) {
				const arraPath = path.split('/');
				arraPath[arraPath.length - 1] = pathParams;
				path = arraPath.toString().replace(',', '/');
			}

			const paramsSupportTitle = this._getQueryParams(breadCrumbData, route) || '';
			nextUrl = `${url}${path}`;
			const breadcrumb: BreadCrumb = this._getCrumb(breadCrumbData, nextUrl, pathParams, paramsSupportTitle);
			newBreadcrumbs = this._setNewBreadcrumb(breadcrumbs, breadcrumb);
			newBreadcrumbs.forEach((crumb) => (crumb.hidden = newBreadcrumbs[newBreadcrumbs.length - 1].hidden));
		}

		if (route.firstChild) {
			return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
		}

		return of(newBreadcrumbs);
	}

	/**
	 * buils parameters for breadcrumb
	 * @param breadCrumbData
	 * @param nextUrl
	 * @param pathParams
	 * @returns
	 */
	private _getCrumb(breadCrumbData: BreadCrumbData, nextUrl: string, pathParams: string, paramsSupportTitle?: any) {
		return {
			label: breadCrumbData?.['breadcrumb'],
			url: nextUrl,
			infoLink: `${breadCrumbData?.['infoLink']}${pathParams}`,
			hidden: !!breadCrumbData?.['hidden'],
			queryParams: paramsSupportTitle,
			onBack: typeof breadCrumbData?.['onBack'] === 'undefined' ? true : breadCrumbData?.['onBack'],
		};
	}

	private _getQueryParams(breadCrumbData: BreadCrumbData, route: ActivatedRoute) {
		const paramsSupportTitle: { key: string; value: any }[] = [];
		// let paramsSupportTitle: string = '';
		if (breadCrumbData?.keyParams) {
			Object.entries(route.snapshot?.queryParams).forEach(([key, value]) => {
				if (breadCrumbData.keyParams.includes(key)) {
					// paramsSupportTitle += `${value}`;
					paramsSupportTitle.push({ key: key, value: value });
				}
			});
		}
		return paramsSupportTitle;
	}

	//** Set the new breadcrumb if it exists label*/
	private _setNewBreadcrumb(breadcrumbs: Array<BreadCrumb>, breadCrumb: BreadCrumb) {
		if (breadCrumb.label) {
			/* 	this._title = breadCrumb.label?.trim();
			this._infoLink = breadCrumb.infoLink; */
			return [...breadcrumbs, breadCrumb];
		}
		return [...breadcrumbs];
	}

	/**
	 *  Return section subtitle
	 * @returns section subtitle
	 */
	getSectionSubtitle(): Observable<string | null> {
		/* if (!this.sectionSubtitle$.value) {
			this.setSectionSubtitle('');
		} */
		return this.sectionSubtitle$.asObservable();
	}

	/**
	 *  Set section subtitle
	 * @param breadcrumbsSectionSubtitle
	 */
	setSectionSubtitle(sectionSubtitle: string) {
		this.sectionSubtitle$.next(sectionSubtitle);
	}
}
