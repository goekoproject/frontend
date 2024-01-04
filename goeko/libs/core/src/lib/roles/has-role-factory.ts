import { inject } from '@angular/core';
import { UserContextService } from '../user-context/user-context.service';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { ROLES, UserRoles } from './role-type.model';

export function hasRole(...allowedRoles: UserRoles[]) {
  return () =>
    inject(UserContextService).userRole.pipe(
      map((userRole) => handleRoles(userRole, allowedRoles)),
      distinctUntilChanged(),
      tap((hasRole) => {
        if (!hasRole) {
          alert('Access denied');
          window.history.back();
        }
      })
    );
}

export const handleRoles = (
  userRole: UserRoles[],
  allowedRoles: UserRoles[] = [ROLES.PUBLIC]
) =>
  userRole.includes(ROLES.ADMIN) ||
  userRole.some((role) => Boolean(role && allowedRoles?.includes(role)));
