import { Inject, Injectable } from '@angular/core';
import { SME_CONFIGURATION } from './sme.module';
import { SmeOptions } from './sme-options';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SmeRecomendationRequest, SmeRecomendationRequestDemo } from './sme-request.model';
import { BehaviorSubject, Observable, find, first, from, map, mergeMap, reduce } from 'rxjs';
import { SessionStorageService } from '../session-storage.service';

@Injectable()
export class SmeService {
	constructor(
		@Inject(SME_CONFIGURATION) public configuration: SmeOptions,
		private readonly sessionStorageService: SessionStorageService,

		private _http: HttpClient
	) {}

	/* 	getRecommendations(body: SmeRecomendationRequest): Observable<any> {
		return this._http.get<any>(`assets/data/recommendation-response.json`);
	} */

	getRecommendations(body: SmeRecomendationRequestDemo): Observable<any> {
		return this._http.post<any>(`${this.configuration.endpoint}/v1/demo/recommendation/smes`, body);
	}

	getRecommendationsById(id: string): Observable<any> {
		return this._http.get<any>(`${this.configuration.endpoint}/v1/recommendation/requests/smes/${id}`);
	}

	getLastRecommendationById(id: string): Observable<any> {
		return this.getRecommendationsById(id).pipe(
			map((recommendation) => recommendation.requests),
			mergeMap((data) => from(data)), // Convierte el array en un Observable de elementos individuales
			reduce((maxItem: any, currentItem: any) =>
				new Date(currentItem.date) > new Date(maxItem.date) ? currentItem : maxItem
			)
		);
	}

	createRecommendations(body: SmeRecomendationRequest): Observable<any> {
		return this._http.post<any>(`${this.configuration.endpoint}/v1/recommendation/smes`, body);
	}

	getByIdExternal(id: string): Observable<any> {
		const _id = encodeURIComponent(id);
		const params = new HttpParams().set('id', _id);

		return this._http.get<any>(`${this.configuration.endpoint}/v1/actor/smes/external`, { params });
	}

	getById(id: string): Observable<any> {
		return this._http.get<any>(`${this.configuration.endpoint}/v1/actor/smes/` + id);
	}

	createDataProfile(body: any) {
		return this._http.post<any>(`${this.configuration.endpoint}/v1/actor/smes`, body);
	}
	updateDataProfile(id: any, body: any) {
		return this._http.put<any>(`${this.configuration.endpoint}/v1/actor/smes/${id}`, body);
	}
}
