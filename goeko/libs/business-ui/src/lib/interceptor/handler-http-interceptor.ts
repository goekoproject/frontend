import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { Notification, ToastService } from '@goeko/store'
import { throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
const isPlatformGoeko = (request: HttpRequest<unknown>) => request.url.includes('/v1')
enum TOAST_NOTIFICATION_TYPE {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}
type MessageError = {
  [key: number]: Notification
}
type SuccessMessage = {
  [key: string]: Notification
}

const ERROR_MESSAGE: MessageError = {
  500: { message: 'ERROR_MESSAGES.500', type: TOAST_NOTIFICATION_TYPE.ERROR },
  400: { message: 'ERROR_MESSAGES.400', type: TOAST_NOTIFICATION_TYPE.ERROR },
  404: { message: 'ERROR_MESSAGES.404', type: TOAST_NOTIFICATION_TYPE.WARNING },
}

const SUCCESS_MESSAGE: SuccessMessage = {
  POST: {
    message: 'POST',
    type: 'SUCCESS',
    subtype: 'POST',
  },
  PUT: {
    message: 'PUT',
    type: 'SUCCESS',
    subtype: 'PUT',
  },
  DELETE: {
    message: 'DELETE',
    type: 'SUCCESS',
    subtype: 'DELETE',
  },
}
export const handlerHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastService = inject(ToastService)
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && isPlatformGoeko(req) && !req.url.includes('search?lang')) {
        const successMessage = SUCCESS_MESSAGE[req.method as keyof typeof SUCCESS_MESSAGE]
        if (successMessage) {
          _toastService.notify(successMessage.message, successMessage.type, successMessage.subtype)
        }
      }
    }),
    catchError((error) => {
      const errorMessage = ERROR_MESSAGE[error.status as keyof typeof ERROR_MESSAGE]
      if (errorMessage) {
        _toastService.notify(errorMessage.message, errorMessage.type)
      } else {
        console.error(error)
      }
      return throwError(() => error)
    }),
  )
}
