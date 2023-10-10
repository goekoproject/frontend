import { Inject, Injectable } from '@angular/core';
import { SME_CONFIGURATION } from './sme.module';
import { SmeOptions } from './sme-options';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SmeRecomendationRequest } from './sme-request.model';
import { Observable } from 'rxjs';

@Injectable()
export class SmeService {
	constructor(@Inject(SME_CONFIGURATION) public configuration: SmeOptions, private _http: HttpClient) {}

	/* 	getRecommendations(body: SmeRecomendationRequest): Observable<any> {
		return this._http.get<any>(`assets/data/recommendation-response.json`);
	} */

	getRecommendations(body: SmeRecomendationRequest): Observable<any> {
		return this._http.post<any>(`${this.configuration.endpoint}/v1/demo/recommendation/smes`, body);
	}

	getByIdExternal(id: string): Observable<any> {
		const _id = encodeURIComponent(id);
		const params = new HttpParams().set('id', _id);

		return this._http.get<any>(`${this.configuration.endpoint}/v1/actor/smes/external`, { params });
	}

	getById(id = '978077bc-f4cd-49a1-a1ad-9b5576ff95b7'): Observable<any> {
		return this._http.get<any>(`${this.configuration.endpoint}/v1/actor/smes/` + id);
	}

	saveDataProfile(body: any) {
		return this._http.post<any>(`${this.configuration.endpoint}/v1/actor/smes`, body);
	}
}
