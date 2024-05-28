import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerOverlayService } from '../spinner-overlay/spinner-overlay.service';
const TIMEOUT_ABORTED = 5000;
@Injectable({
  providedIn: 'platform',
})
export class LoadingService {
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  /** Contains in-progress loading events */
  private _loadingEvents: Array<string> = [];
  constructor(private spinnerOverlay: SpinnerOverlayService) {
    this._subscribeToLoadingEvents();
  }

  /**
   *  Adds a new request pending
   * @param number
   */
  start(loadingEvent: string) {
    //Quitar el overlay de cargando al llamar al endpoint de discrepancias para las alertas,
    //El problema es que se quita tambien en la pantalla de discrepancias (porque es el mismo endpoint)
    if (loadingEvent.includes('assets')) {
      return;
    }
    this._loadingEvents.push(loadingEvent);
    if (this._loading$.getValue() === false) {
      this._loading$.next(true);
    }
  }
  /**
   *  add as finished a request
   * @param number
   */
  stop(loadingEvent: string) {
    setTimeout(() => {
      this._loadingEvents = this._loadingEvents.filter(
        (loadingEv) => loadingEv !== loadingEvent
      );
      if (
        this._loadingEvents.length === 0 &&
        this._loading$.getValue() === true
      ) {
        this._loading$.next(false);
      }
    }, 500);

    setTimeout(() => {

      this._loading$.next(false);

    }, 1000)
  }

  /**
   *  get finished requests
   */
  getFinished(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _subscribeToLoadingEvents() {
    this._loading$.asObservable().subscribe((isLoading) => {
      if (isLoading) {
        this.spinnerOverlay.open();
      } else {
        this.spinnerOverlay.close();
      }
    });
  }
}
