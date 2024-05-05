import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';
import { SessionStorageService } from '../session-storage.service';
import { PaymentSuscription } from './payment-subscription.interface';
export const KEY_STORAGE = 'GO_IS_SUS';
@Injectable({
  providedIn: 'root',
})
export class PaymentSystemService {
  private _isSubscription = signal(this.sessionStorageService.getItem(KEY_STORAGE));
 

  public get isSubscription() {
    return this._isSubscription();
  }

  private _isSubscription$ = new BehaviorSubject<null | string>(null);
  public get isSubscription$() {
    return this._isSubscription$;
  }
  public set isSubscription$(value) {
    this._isSubscription$ = value;
  }

  
  constructor(
    private _http: HttpClient,
    private readonly sessionStorageService: SessionStorageService,
  ) {}

  cleantechSubscription(id: string): Observable<PaymentSuscription> {
    return this._http.get<PaymentSuscription>(
      `/v1/payment/cleantech/${id}/subscription`
    );
  }

  isSubscribedForActor(id: string) {
    this.cleantechSubscription(id).pipe(
      map((isSubscribed: PaymentSuscription) =>
       { this.sessionStorageService.setItem(
          KEY_STORAGE,
          isSubscribed.providerDetails.subscriptionId
       );
       this._isSubscription$.next(isSubscribed.providerDetails.subscriptionId)

        }
      ),
      catchError(() => {
        this.sessionStorageService.setItem(KEY_STORAGE, false);
        return EMPTY;
      })
    ).subscribe();
  }
}
