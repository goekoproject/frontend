import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ECOSOLUTIONS_CONFIGURATION } from './ecosolutions.module';
import { EcosolutionsOptions } from './ecosolutions-options';

@Injectable({
	providedIn: 'root',
})
export class EcosolutionsService {
	constructor(
		private _http: HttpClient,
		@Inject(ECOSOLUTIONS_CONFIGURATION) public configuration: EcosolutionsOptions
	) {}

	getAll() {
		return this._http.get(`${this.configuration.endpoint}/v1/ecosolutions`);
	}

	getByIdCleantechId(id: string) {
		return this._http.get(`${this.configuration.endpoint}/v1/ecosolutions/cleantech/${id}`);
	}
}
