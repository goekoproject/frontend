import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { SESSIONID, TOKEN_USER } from './auth.service';
import { ACCESS_TOKEN, ID_TOKEN } from './auth0.abtract';

/**
 * Inteceptor for authenticating a user
 */
@Injectable({ providedIn: 'platform' })
export class AuthInterceptor implements HttpInterceptor {
	constructor(private _route: Router) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const accessToken = sessionStorage.getItem(SESSIONID);
		const token = sessionStorage.getItem(TOKEN_USER);
		if (accessToken) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		}

		return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this._handleError(error)));
	}

	private _handleError(error: HttpErrorResponse) {
		if (error && error.status === 401) {
			this._route.navigate(['/']);
		}
		return throwError(() => error);
	}
}
