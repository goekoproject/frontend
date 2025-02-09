import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { CONFIGURATION } from '../../config-token'
import { Options } from '../../models/options.interface'
import { SessionStorageService } from '../../services/session-storage.service'
import { SESSIONID } from './auth.constants'
import { AuthService } from './auth.service'

const isPlatformGoeko = (request: HttpRequest<unknown>) => request.url.includes('assets')

/**
 * Function-based interceptor for authenticating a user
 */
export const authHttpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const sessionStorage = inject(SessionStorageService)
  const configuration = inject(CONFIGURATION) as Options

  // Check if the request is for the Goeko platform
  if (!isPlatformGoeko(req)) {
    req = requestGoekoBackend(req, configuration, sessionStorage)
  }

  return next(req).pipe(catchError((error: HttpErrorResponse) => handleError(error)))
}

/**
 * Handles errors in the HTTP response
 */
function handleError(error: HttpErrorResponse): Observable<never> {
  if (error && error.status === 401) {
    const authService = inject(AuthService)
    authService?.killSessions()
  }
  return throwError(() => error)
}

/**
 * Modifies the request to include the Goeko backend URL and authorization header
 */
function requestGoekoBackend(
  request: HttpRequest<unknown>,
  configuration: Options,
  sessionStorage: SessionStorageService,
): HttpRequest<unknown> {
  const accessToken = sessionStorage.getItem(SESSIONID)

  return request.clone({
    url: `${configuration.endopoint}${request.url}`,
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
