import { inject } from '@angular/core';
import { Role } from './role-type.model';
import { UserContextService } from '../user-context/user-context.service';
import { map, tap } from 'rxjs';

export function hasRole(...allowedRoles: Role[]) {
  return () =>
    inject(UserContextService).userType.pipe(
      map((userType) => Boolean(userType && allowedRoles.includes(userType))),
      tap((hasRole) => hasRole === false && alert('Access denied'))
    );
}
