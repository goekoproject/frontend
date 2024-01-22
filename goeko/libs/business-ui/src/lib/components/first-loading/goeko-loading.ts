import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class LoadingGoekoervice {
  private _startPlatform$ = new BehaviorSubject<boolean>(false);
  public get startPlatform$(): Observable<boolean> {
    return this._startPlatform$.asObservable();
  }
  public set startPlatform$(value: boolean) {
    this._startPlatform$.next(value);
  }

  constructor() {}
}
