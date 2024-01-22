import { inject } from '@angular/core';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { UserType } from './user-type.constants';
import { UserService } from './user.services';

export function hasUserType(...allowedUserType: UserType[]) {
  return () =>
    inject(UserService).userType$.pipe(
      map((userType) =>
        Boolean(userType && allowedUserType.includes(userType))
      ),
      distinctUntilChanged(),
      tap((hasRole) => {
        if (!hasRole) {
          alert('Access denied');
          window.history.back();
        }
      })
    );
}
