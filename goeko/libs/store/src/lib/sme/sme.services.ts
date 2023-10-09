import { Inject, Injectable } from '@angular/core';
import { SME_CONFIGURATION } from './sme.module';
import { SmeOptions } from './sme-options';
import { HttpClient } from '@angular/common/http';
import { SmeRecomendationRequest } from './sme-request.model';
import { Observable } from 'rxjs';
import { SmeRecomendation } from './sme-recommendation.interface';

@Injectable()
export class SmeService {
	constructor(@Inject(SME_CONFIGURATION) public configuration: SmeOptions, private _http: HttpClient) {}

	/* 	getRecommendations(body: SmeRecomendationRequest): Observable<any> {
		return this._http.get<any>(`assets/data/recommendation-response.json`);
	} */

	getRecommendations(body: SmeRecomendationRequest): Observable<any> {
		return this._http.post<any>(`${this.configuration.endpoint}/v1/demo/recommendation/smes`, body);
	}
}
