import { Injectable } from '@angular/core';
import { SmeRecomendationRequestDemo } from '@goeko/store';

@Injectable({ providedIn: 'root' })
export class DemoService {
	private _dataform!: SmeRecomendationRequestDemo;
	constructor() {}

	setDataForm(data: any) {
		this._dataform = data;
		sessionStorage.setItem('dataForm', JSON.stringify(this._dataform));
	}

	getDataForm() {
		return this._dataform || JSON.parse(sessionStorage.getItem('dataForm') as any);
	}
}
