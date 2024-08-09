import { DOCUMENT } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { AuthService } from '@goeko/core'
import { SignUp } from './singup.model'

const URL_SIGNUP = 'https://soft-glitter-5713.eu.auth0.com/dbconnections/signup'

@Injectable({ providedIn: 'root' })
export class AccessService {
  public auth$ = this._authService.userAuth$
  private _urlPageEmailVerify = `${this.doc.location.origin}/verify-email`

  public isAutenticated = this._authService.isAuthenticated
  constructor(
    private _authService: AuthService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  public signUpAndAccess(body: SignUp) {
    return this._authService.signUpAndLogin(body)
  }

  public afterSignUp() {
    this._authService.logout(this._urlPageEmailVerify)
  }
  public login(body: any) {
    this._authService.isLoggedIn({ username: body.email, password: body.password })
  }
}
