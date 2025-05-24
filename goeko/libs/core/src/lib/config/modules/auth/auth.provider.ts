import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core'
import { AuthService } from './auth.service'

export function initTokenAuth(authService: AuthService) {
  return () => authService.initializeToken()
}

export const providerToken = () => {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: initTokenAuth,
      deps: [AuthService],
      multi: true,
    },
  ])
}
