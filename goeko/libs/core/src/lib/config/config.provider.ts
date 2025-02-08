import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { CONFIGURATION } from './config-token'
import { Options } from './models/options.interface'
import { AuthService } from './modules/auth/auth.service'

// Función para proporcionar la configuración global del módulo
export function provideConfig(options: Options) {
  return [
    // Proveedores funcionales
    { provide: CONFIGURATION, useValue: options },
    provideHttpClient(withInterceptorsFromDi()),
    AuthService,
  ]
}
