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
  console.log('init platform')
  return (): Promise<any> => {
    return firstValueFrom(
      authService.userInfo$.pipe(
        catchError((error) => {
          console.log('Error de inicialización de autenticación', error)
          throw error
        }),
        tap((userInfo) => console.log('userInfo', userInfo)),
        tap((userInfo) => userService.setAuthUser(userInfo)),
        tap(() => userService.checkEmailVerified()),
        switchMap(() => userService.getDataProfile()),
      ),
    )
      .then((dataProfile) => {
        console.log('check data profile')
        if (dataProfile) {
          console.log('get data profile')
          userService.propagateDataUser(dataProfile)
        } else {
          userService.redirectProfile()
        }
      })
      .catch(() => (window.location.href = 'login'))
  }
}
