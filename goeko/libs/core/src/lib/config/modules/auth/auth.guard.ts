import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthService, private readonly _router: Router) {
  }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._isAuthenticated();
  }

  	/**
	 *  Method that checks if there is a token present, that means the user is logged,
	 * if the token is invalid the AuthService will take care of it
	 */
	private _isAuthenticated(): Observable<boolean> | boolean {
		if(!this._authService.isAuthenticated()) {
			this._authService.killSessions();
			this._router.navigate(['']);
			return false;
		}
		return this._authService.isAuthenticated();
	}
  
}
