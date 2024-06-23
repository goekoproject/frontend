import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';
import { SessionStorageService } from '../session-storage.service';
import { PaymentSuscription } from './payment-subscription.interface';
export const KEY_STORAGE = 'GO_IS_SUS';
export const STATUS_PENDING = 'pending';
@Injectable({
  providedIn: 'root',
})
export class PaymentSystemService {
  private _isSubscription = signal(
    this.sessionStorageService.getItem(KEY_STORAGE) || STATUS_PENDING,
  );

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
      `/v1/payment/cleantech/${id}/subscription`,
    );
  }

  isSubscribedForActor(id: string) {
    this.cleantechSubscription(id)
      .pipe(
        map((isSubscribed: PaymentSuscription) => {
          const subscriptionId = isSubscribed.providerDetails.subscriptionId;
          this._saveIsSuscription(subscriptionId);
        }),
        catchError(() => {
          this.sessionStorageService.setItem(KEY_STORAGE, false);
          this._saveIsSuscription('');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  private _saveIsSuscription(subscriptionId: string) {
    this.sessionStorageService.setItem(KEY_STORAGE, subscriptionId);
    this._isSubscription.set(subscriptionId);
    this._isSubscription$.next(subscriptionId);
  }
}
