import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TranformDateInterceptor implements HttpInterceptor {
	private readonly _isoDateFormat =
		/^(19|20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)/;
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const newReqParams = this._transfromQueryParams(req);
		//const newReqBody = this._tranformBody(req);
		const newReq = req.clone({ ...newReqParams });
		return next.handle(newReq);
	}

	_isIsoDateString(value: any): boolean {
		if (value === null || value === undefined) {
			return false;
		}
		if (typeof value === 'string') {
			return this._isoDateFormat.test(value);
		}
		return false;
	}

	private _transfromQueryParams(req: HttpRequest<any>) {
		let newParams = new HttpParams();
		req.params.keys().forEach((key) => {
			if (this._isoDateFormat.test(req.params.get(key) as any)) {
				const dateTranform = this._tranformDate(req.params.get(key) as any);
				newParams = newParams.set(key, dateTranform);
			} else {
				newParams = newParams.set(key, req.params.get(key) as any);
			}
		});
		return req.clone({
			params: newParams
		});
	}

	private _tranformBody(req: HttpRequest<any>) {
		let newBody: void;
		if (!req.body) {
			return;
		}
		const body = req.body;
		// eslint-disable-next-line prefer-const
		newBody = this._loopObject(body);

		return req.clone({
			body: newBody
		});
	}

	private _loopObject(body: any) {
		let newBody: void;

		Object.keys(body).forEach((key) => {
			if (this._isoDateFormat.test(body[key])) {
				const dateTranform = this._tranformDate(body[key]);
				newBody = { ...body, key: dateTranform };
			} else if (typeof body[key] === 'object') {
				this._loopObject(body[key]);
			} else {
				newBody = { ...body };
			}
		});
		return newBody;
	}

	/**
	 * Transforms date format yyyy-mm-dd for request back
	 * @param date
	 * @returns
	 */
	private _tranformDate(date: Date): string {
		return new Date(date).toISOString().substring(0, 10);
	}
}
