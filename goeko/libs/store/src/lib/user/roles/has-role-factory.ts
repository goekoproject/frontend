import { inject } from '@angular/core'
import { of } from 'rxjs'
import { UserService } from '../user.services'
import { ROLES, UserRoles } from './role-type.model'

export function hasRole(...allowedRoles: UserRoles[]) {
  return () => {
    const userRoles = inject(UserService).userRoles()
    const hasRole = handleRoles(userRoles, allowedRoles)
    if (!hasRole) {
      alert('Access denied')
      return of(false)
    }
    return of(true)
  }
}

export const handleRoles = (userRole: UserRoles[], allowedRoles: UserRoles[] = [ROLES.PUBLIC]) =>
  userRole?.some((role) => Boolean(role && allowedRoles?.includes(role)))
