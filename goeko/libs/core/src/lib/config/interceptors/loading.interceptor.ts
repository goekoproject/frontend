import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loading.service';

@Injectable({ providedIn: 'platform'})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private readonly _loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      this._loadingService.start(request.url);

    return next.handle(request)
      .pipe(
        finalize(() => {
           this._loadingService.stop(request.url);
        })
      );
  }
}
