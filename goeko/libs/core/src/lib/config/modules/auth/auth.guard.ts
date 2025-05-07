import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from './auth.service'

export const checkSessionUserData: CanActivateFn = () => {
  const authService = inject(AuthService)
  return !authService.isAuthenticated ? true : authService.checkSession$
}

export const AuthGuard: CanActivateFn = () => {
  return inject(AuthService).isAuthenticated ? true : inject(Router).createUrlTree(['/login'])
}

export const redirectIsAuthenticated: CanActivateFn = () => {
  return inject(AuthService).isAuthenticated ? inject(Router).createUrlTree(['/platform']) : true
}
