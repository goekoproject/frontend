import { inject } from '@angular/core';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { UserContextService, UserRoles } from '@goeko/core';

export function hasUserType(...allowedUserType: UserRoles[]) {
  return () =>
    inject(UserContextService).userType.pipe(
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
