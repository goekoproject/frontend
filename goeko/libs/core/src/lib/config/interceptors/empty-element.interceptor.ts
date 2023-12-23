import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EmptyElementsInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let clonedReq = req.clone();

		// Modify body for delete empty elements
		if (clonedReq.body && !clonedReq.url.includes('demo')) {
			clonedReq = clonedReq.clone({
				body: this._removeEmptyElements(clonedReq.body),
			});
		}

		// Pasar la solicitud modificada al siguiente interceptor en la cadena
		return next.handle(clonedReq);
	}

	private _removeEmptyElements(obj: any): any {
		Object.keys(obj).forEach((key) => {
			if (obj[key] && typeof obj[key] === 'object') {
				this._removeEmptyElements(obj[key]);
			} else if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
				delete obj[key];
			}
		});
		return obj;
	}
}
