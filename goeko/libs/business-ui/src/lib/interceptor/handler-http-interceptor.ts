// Suggested code may be subject to a license. Learn more: ~LicenseLog:3842334650.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:107842066.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:554572676.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2115446450.
import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TOAST_NOTIFICATION_TYPE, ToastService } from '@goeko/store';
const ERROR_MESSAGE = {
    500 : { message: 'Ha ocurrido un error en el servidor', type: TOAST_NOTIFICATION_TYPE.ERROR},
    404 : { message: 'Ha ocurrido un error en el servido', type :TOAST_NOTIFICATION_TYPE.WARNING},
}
@Injectable()
export class HandlerHttpInterceptor implements HttpInterceptor {
    constructor(private toastService: ToastService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const notificationService = new NotificationService(this.toastService);
                    notificationService.notify(req.method);
                }
            }),
            catchError((err) => {
                return this._handlerError(err);
            })
        );

    }
    private _handlerError(error: HttpErrorResponse) {
        const errorMessage = ERROR_MESSAGE[error.status as keyof typeof  ERROR_MESSAGE];
        this.toastService.notify(errorMessage.message, errorMessage.type);
        return throwError(() => error);
    }

}
class NotificationService {
    constructor(private toastService: ToastService) { }

    notify(method: string): void {
        switch (method) {
            case 'POST':
                this.toastService.notify('Se ha creado correctamente', TOAST_NOTIFICATION_TYPE.SUCCESS);
                break;
            case 'PUT':
                this.toastService.notify('Se ha actualizado correctamente', TOAST_NOTIFICATION_TYPE.UPDATE);
                break;
            case 'DELETE':
                this.toastService.notify('Se ha eliminado correctamente', TOAST_NOTIFICATION_TYPE.DELETE);
                break;
            default:
                console.log('method not registry')
        }
    }
}

