import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ACCESS_TOKEN, TOKEN_USER } from './auth.service';

/**
 * Inteceptor for authenticating a user
 */
@Injectable({ providedIn: 'platform' })
export class AuthInterceptor implements HttpInterceptor {
	constructor(private _route: Router) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
		const token = sessionStorage.getItem(TOKEN_USER);
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`,
					'X-Authorization': `Bearer ${token}`,
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
