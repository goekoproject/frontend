import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { AuthService } from '@goeko/core';
import { ROLES, UserService } from '@goeko/store';
import { Observable, map, take } from 'rxjs';

const namespace = 'https://goeko';

@Injectable({ providedIn: 'any' })
export class LoadDataUser {
  constructor(
    private _userServices: UserService,
    private _router: Router,
    private _authService: AuthService
  ) {}
  resolve(): Observable<any> {
    return this._authService.userAuth$.pipe(
      take(1),
      map((userData) => {
        if (userData) {
          const userDataTransform = {
            ...userData,
            externalId: userData?.sub?.replace('auth0|', ''),
            roles: this._getUserRole(userData),
          };
          this._userServices.userAuthData.set(userDataTransform);
          this._router.navigate([`dashboard/${userData['userType']}`]);
        }
      })
    );
  }

  private _getUserRole = (userData: User) => {
    const roles = userData[`${namespace}/roles`];
    return [ROLES.PUBLIC, ...roles];
  };
}
