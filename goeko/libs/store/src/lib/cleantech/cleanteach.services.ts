import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleanTechOptions } from './cleantech-options';
import { CLEANTECH_CONFIGURATION } from './cleantech.module';

@Injectable()
export class CleanTechService {
	constructor(@Inject(CLEANTECH_CONFIGURATION) public configuration: CleanTechOptions, private _http: HttpClient) {}

	getByIdExternal(id: string): Observable<any> {
		const _id = encodeURIComponent(id);
		const params = new HttpParams().set('id', _id);
		return this._http.get<any>(`${this.configuration.endpoint}/v1/actor/cleantechs/external`, { params });
	}

	getById(id: string): Observable<any> {
		return this._http.get<any>(`${this.configuration.endpoint}/v1/actor/cleantechs/` + id);
	}

	createDataProfile(body: any) {
		return this._http.post<any>(`${this.configuration.endpoint}/v1/actor/cleantechs`, body);
	}
	updateDataProfile(id: any, body: any) {
		return this._http.put<any>(`${this.configuration.endpoint}/v1/actor/cleantechs/${id}`, body);
	}

	uploadDocument(id: string, file: any) {
		const formData = new FormData();
		formData.append('file', file);
		return this._http.post<any>(`${this.configuration.endpoint}/v1/actor/cleantechs/${id}/documentation`, formData);
	}

	getDocuments(id: string) {
		return this._http.get<any>(`${this.configuration.endpoint}/v1/actor/cleantechs/${id}/documentation`);
	}
}
