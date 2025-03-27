import { ENVIRONMENT_INITIALIZER, Provider } from '@angular/core'
import { AuthService } from '@goeko/core'
import { UserService } from '@goeko/store'
import { catchError, firstValueFrom, switchMap, tap } from 'rxjs'

export const ProviderLoadUserInfo: Provider = {
  provide: ENVIRONMENT_INITIALIZER,
  useFactory: initializeAuth,
  deps: [AuthService, UserService],
  multi: true,
}
export function initializeAuth(authService: AuthService, userService: UserService) {
  return (): Promise<any> => {
    return firstValueFrom(
      authService.userInfo$.pipe(
        catchError((error) => {
          // Manejar errores de autenticación
          console.error('Error de inicialización de autenticación', error)
          // Puedes lanzar un error o devolver un valor por defecto
          throw error
        }),
        tap((userInfo) => userService.auth0UserProfile.set(userInfo)),
        tap(() => userService.checkEmailVerified()),
        switchMap(() => userService.getDataProfile()),
      ),
    )
      .then((dataProfile) => {
        if (dataProfile) {
          userService.propagateDataUser(dataProfile)
          userService.redirectDashboard()
        } else {
          userService.redirectProfile()
        }
      })
      .catch(() => (window.location.href = 'login'))
  }
}
