import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, signal } from '@angular/core'
import { LangOfLocalecontentFul } from '@goeko/store'
import { TranslateService } from '@ngx-translate/core'
import { Auth0UserProfile } from 'auth0-js'
import { catchError, Observable, of, tap, throwError } from 'rxjs'
import { CONFIGURATION } from '../../config-token'
import { Options } from '../../models/options.interface'
import { AuthRequest } from './auth-request.interface'
import { AUTH_CONNECT, EXPIRES_AT, SESSIONID } from './auth.constants'
import { Auth0Connected, setSession } from './auth0.abtract'
import { SignUp } from './signup.interface'

type ErrorAuthType = 'general' | 'verifyEmail'
enum ErrAuth {
  GENERAL = 'general',
  VERIFY_EMAIL = 'verifyEmail',
}
interface ErrorAuth {
  type: ErrorAuthType
  message: string
}

@Injectable({ providedIn: 'platform' })
export class AuthService extends Auth0Connected {
  private _clientId: string

  public get accessToken() {
    return this.sessionStorage.getItem(SESSIONID)
  }
  public authenticated = signal<boolean>(false)

  get currentLang() {
    const codeLang = this._translate.currentLang || this._translate.defaultLang
    const currentLang = LangOfLocalecontentFul[codeLang as keyof typeof LangOfLocalecontentFul]
    return signal(currentLang)
  }
  private _dataAuthConect = ({ username = '', password = '' }) => {
    return {
      realm: this._config.connection,
      audience: this._config.audience,
      username,
      password,
    }
  }

  get isAuthenticated(): boolean {
    const expiresAt = this.sessionStorage.getItem(EXPIRES_AT) as number
    return new Date().getTime() < expiresAt
  }

  get userInfo$(): Observable<Auth0UserProfile> {
    return this._userInfo$
  }
  get checkSession$(): Observable<any> {
    return this._checkSession$.pipe(
      tap((user) => {
        if (user) {
          this.authenticated.set(this.isAuthenticated)
        }
      }),
    )
  }

  constructor(
    @Inject(CONFIGURATION) private _config: Options,
    @Inject(DOCUMENT) private doc: Document,
    private readonly _translate: TranslateService,
  ) {
    super(_config, AUTH_CONNECT.REDIRECT_URI)
    this._clientId = this._config.clientId
  }

  /**
   *  Manages the access token
   * @param body
   * @returns
   */
  isLoggedIn(body: AuthRequest) {
    if (!body) {
      return of(null)
    }
    return this._loginAuth0(body)
  }

  signUpAndLogin(newBody: SignUp) {
    const body = {
      email: newBody.email,
      password: newBody.password,
      connection: this._config.connection,
      userMetadata: newBody.user_metadata,
    }
    return new Observable((observer) => {
      this.webAuth.signup(body, (err, result) => {
        if (err) {
          observer.error(err)
        } else {
          observer.next(result)
          observer.complete()
        }
      })
    })
  }

  /**
   *
   * @param body
   */
  private _loginAuth0(body: AuthRequest) {
    const auth0Params = this._dataAuthConect({
      username: body.username,
      password: body.password,
    })

    return new Observable((observer) => {
      this.webAuth.login(auth0Params, (err, result) => {
        if (err) {
          observer.error(err)
        } else {
          observer.next(result)
          observer.complete()
        }
      })
    })
  }

  initializeToken() {
    this.webAuth.parseHash({ hash: window.location.hash }, function (err, authResult) {
      if (authResult) {
        setSession(authResult)
      }
    })
  }

  public parseHashAuth0() {
    return this._parseHashAuth0().pipe(
      tap((user) => {
        if (user) {
          this.authenticated.set(this.isAuthenticated)
        }
      }),
      catchError(this._handerError),
    )
  }

  private _handerError(err: any) {
    let errorMessage: ErrorAuth = { type: ErrAuth.VERIFY_EMAIL, message: 'An unknown error occurred!' }
    if (err.errorDescription?.includes('verify your email before')) {
      errorMessage = { type: ErrAuth.VERIFY_EMAIL, message: err.errorDescription }
    }
    return throwError(() => new Error(errorMessage.type, { cause: errorMessage }))
  }

  logout(returnTo = `${this.doc.location.origin}/login`) {
    this.sessionStorage.clearItems()
    localStorage.removeItem('_rawUser')
    this.webAuth.logout({ returnTo: returnTo, clientID: this._clientId })
  }

  killSessions(): void {
    this.logout()
  }

  changePassword(email: string) {
    return this.changePasswordAuth0(email)
  }
}
