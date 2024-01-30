import { Injectable, Injector, Type, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ROLES, UserService } from '@goeko/store';
import { Observable, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private readonly _authService: AuthService) {}

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

export const goToUniversalLogin = (): Observable<any> => {
  const authService = inject(AuthService);
  return authService.isAuthenticated$.pipe(
    map((isAuthenticated: any) => {
      if (isAuthenticated) {
        return of(isAuthenticated);
      } else {
        return authService.universalLogin();
      }
    })
  );
};
