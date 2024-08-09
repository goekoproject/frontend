import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable, catchError, throwError } from 'rxjs'
import { CONFIGURATION } from '../../config-token'
import { Options } from '../../models/options.interface'
import { SessionStorageService } from '../../services/session-storage.service'
import { SESSIONID } from './auth.constants'
import { AuthService } from './auth.service'

const isPlatformGoeko = (request: HttpRequest<unknown>) => request.url.includes('assets')

/**
 * Inteceptor for authenticating a user
 */
@Injectable({ providedIn: 'root' })
export class AuthHttpInterceptor implements HttpInterceptor {
  private get _accessToken() {
    return this.sessionStorage.getItem(SESSIONID)
  }
  constructor(
    @Inject(CONFIGURATION) public configuration: Options,
    private sessionStorage: SessionStorageService,
    private _auth: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!isPlatformGoeko(request)) {
      request = this.requestGoekoBakend(request)
    }

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this._handleError(error)))
  }

  private _handleError(error: HttpErrorResponse) {
    if (error && error.status === 401) {
      this._auth.killSessions()
    }
    return throwError(() => error)
  }

  private requestGoekoBakend(request: HttpRequest<unknown>) {
    return request.clone({
      url: `${this.configuration.endopoint}${request.url}`,
      setHeaders: {
        Authorization: `Bearer ${this._accessToken}`,
      },
    })
  }
}
