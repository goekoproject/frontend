import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { SESSIONID } from './auth.constants';
import { CONFIGURATION } from '../../config.module';
import { Options } from '../../models/options.interface';
import { AuthService } from '@auth0/auth0-angular';

/**
 * Inteceptor for authenticating a user
 */
@Injectable({ providedIn: 'platform' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _route: Router,
    private _auth: AuthService,
    @Inject(CONFIGURATION) public configuration: Options
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = sessionStorage.getItem(SESSIONID);

    if (!request.url.includes('assets')) {
      request = this.requestGoekoBakend(request);
    }

    return next
      .handle(request)
      .pipe(catchError((error: HttpErrorResponse) => this._handleError(error)));
  }

  private _handleError(error: HttpErrorResponse) {
    if (error && error.status === 401) {
      /*       this._auth.killSessions();
       */
    }
    return throwError(() => error);
  }

  private requestGoekoBakend(request: HttpRequest<unknown>) {
    return request.clone({
      url: `${this.configuration.endopoint}${request.url}`,
      /*  setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      }, */
    });
  }
}
