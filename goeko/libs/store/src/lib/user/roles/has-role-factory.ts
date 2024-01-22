import { inject } from '@angular/core';
import { distinctUntilChanged, map, of, tap } from 'rxjs';
import { ROLES, UserRoles } from './role-type.model';
import { UserService } from '../user.services';

export function hasRole(...allowedRoles: UserRoles[]) {
  return () => {
    const userRoles = inject(UserService).userRoles();
    const hasRole = handleRoles(userRoles, allowedRoles);
    if (!hasRole) {
      alert('Access denied');
      return of(false);
    }
    return of(true);
  };
  /*     inject(UserService).userRoles$.pipe(
      map((userRole) => handleRoles(userRole, allowedRoles)),
      distinctUntilChanged(),
      tap((hasRole) => {
        if (!hasRole) {
          alert('Access denied');
          window.history.back();
        }
      })
    ); */
}

export const handleRoles = (
  userRole: UserRoles[],
  allowedRoles: UserRoles[] = [ROLES.PUBLIC]
) =>
  userRole.some((role) =>
    Boolean((role && allowedRoles?.includes(role)) || role === ROLES.ADMIN)
  );
