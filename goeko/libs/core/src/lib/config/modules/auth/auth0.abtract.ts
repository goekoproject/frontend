import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { ROLES } from '@goeko/store'
import { Auth0UserProfile, WebAuth } from 'auth0-js'
import { BehaviorSubject, Observable } from 'rxjs'
import { Options } from '../../models/options.interface'
import { SessionStorageService } from '../../services/session-storage.service'
import { EXPIRES_AT, SESSIONID } from './auth.constants'
export const ACCESS_TOKEN = 'accessToken'
export const SS_JWTDATA = 'jwtData'
const namespace = 'https://platform.goeko'

const getUserRole = (userData: any) => {
  if (!userData) return [ROLES.PUBLIC]
  const roles = userData[`${namespace}/roles`]
  return [ROLES.PUBLIC, ...roles]
}

export interface AuthResponse {
  at_hash: string
  aud: string
  email: string
  email_verified: boolean
  exp: number
  externalId: string
  iat: number
  iss: string
  name: string
  nickname: string
  nonce: string
  picture: string
  sub: string
  updated_at: string
  userType: string
}

const setItemSessionStorage = (name: string, obj: any, code?: boolean) => {
  if (code) {
    sessionStorage.setItem(name, window.btoa(JSON.stringify(obj)))
    return
  }
  sessionStorage.setItem(name, window.btoa(JSON.stringify(obj)))
}
const setSession = (authResult: any) => {
  const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
  setItemSessionStorage(SESSIONID, authResult.accessToken)
  setItemSessionStorage(EXPIRES_AT, expiresAt)
}

export abstract class Auth0Connected {
  public webAuth!: WebAuth
  public expiresIn!: number
  private _connection: string
  private _domain: string
  private _clientID: string
  private _redirectUri: string
  private _audience: string
  private _userAuth = new BehaviorSubject<any>(null)

  get userAuth$(): Observable<any | null | undefined> {
    return this._userAuth.asObservable()
  }
  set userAuth$(value: Observable<any | null | undefined>) {
    this._userAuth.next(value)
  }
  get _userInfo$(): Observable<Auth0UserProfile | any> {
    return new Observable((observer) => {
      this.webAuth.client.userInfo(this.sessionStorage.getItem(SESSIONID) as string, (err, userInfo) => {
        if (err) {
          observer.error(err)
        } else {
          observer.next({
            ...userInfo,
            externalId: userInfo?.sub?.replace('auth0|', ''),
            roles: getUserRole(userInfo),
          })
          observer.complete()
        }
      })
    })
  }

  get _checkSession$() {
    return new Observable((observer) => {
      this.webAuth.checkSession(
        {
          domain: this._domain,
          clientID: this._clientID,
          redirectUri: this._redirectUri,
          responseType: 'token id_token',
          scope: 'openid profile email',
          audience: this._audience,
        },
        (err, authResult) => {
          if (err) {
            observer.error(err)
          } else {
            setSession(authResult)
            observer.next(true)
            observer.complete()
          }
        },
      )
    })
  }
  _router = inject(Router)
  sessionStorage = inject(SessionStorageService)

  constructor(config: Options, redirectUri: string) {
    const { domainAuth0, clientId, connection, audience } = config
    this._domain = domainAuth0
    this._clientID = clientId
    this._redirectUri = redirectUri
    this._connection = connection
    this._audience = audience
    this._connectAuth0()
  }

  disconnectAuth0() {
    this.webAuth.logout({
      clientID: this._clientID,
      returnTo: `${window.location.origin}/login`,
    })
  }
  private _connectAuth0() {
    this.webAuth = new WebAuth({
      domain: this._domain,
      clientID: this._clientID,
      redirectUri: this._redirectUri,
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  }

  public _parseHashAuth0() {
    return new Observable<any>((observer) => {
      this.webAuth.parseHash({ hash: window.location.hash }, function (err, authResult) {
        if (err) {
          if (err.errorDescription?.includes('verify your email before')) {
            window.location.href = `${window.location.origin}/verify-email`
          }
          console.log(err)
        } else {
          if (authResult && authResult.idTokenPayload) {
            setSession(authResult)
            const userAuth0 = authResult.idTokenPayload
            observer.next(userAuth0)
            observer.complete()
          }
        }
      })
    })
  }

  changePasswordAuth0(email: string) {
    return new Observable<any>((observer) => {
      this.webAuth.changePassword(
        {
          connection: this._connection,
          email,
        },
        (error, result) => {
          if (error) {
            observer.error(error)
          } else {
            observer.next(result)
            observer.complete()
          }
        },
      )
    })
  }
}
