import { Injectable, Injector, Type, inject } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanMatchFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private injector = inject(Injector);

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._authService.isAuthenticated$;
  }

  /**
   *  Method that checks if there is a token present, that means the user is logged,
   * if the token is invalid the AuthService will take care of it
   */
}

export const isAuthenticated: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(AuthService).isAuthenticated$
    ? true
    : inject(Router).createUrlTree(['/login']);
};

export const goToUniversalLogin = (): Observable<Type<unknown>> => {
  return inject(AuthService).universalLogin();
};
