import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';
import { AppState, AuthService as Auth0, User } from '@auth0/auth0-angular';
import { LangOfLocalecontentFul } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, concat, from, of } from 'rxjs';
import { CONFIGURATION } from '../../config.module';
import { Options } from '../../models/options.interface';
import { AuthRequest } from './auth-request.interface';
import { AUTH_CONNECT, SS_JWTDATA } from './auth.constants';
import { Auth0Connected, AuthResponse } from './auth0.abtract';
import { SignUp } from './signup.interface';

@Injectable({ providedIn: 'platform' })
export class AuthService extends Auth0Connected {
  private _clientId: string;
  get currentLang() {
    const codeLang =
      this._translate.currentLang || this._translate.defaultLang;
    const currentLang =
      LangOfLocalecontentFul[codeLang as keyof typeof LangOfLocalecontentFul];
    return signal(currentLang);
  }
  private _dataAuthConect = ({ username = '', password = '' }) => {
    return {
      realm: AUTH_CONNECT.REALM,
      clientID: this._clientId,
      redirectUri: AUTH_CONNECT.REDIRECT_URI,
      audience: AUTH_CONNECT.AUDIENCE,
      username,
      password,
    };
  };

  get isAuthenticated$(): Observable<boolean> {

    console.log(this._auth0.getAccessTokenSilently())

    return this._auth0.isAuthenticated$;
  }
  get appState$(): Observable<AppState> {
    return this._auth0.appState$;
  }
  get error$(): Observable<Error> {
    return this._auth0.error$;
  }
  get userAuth$(): Observable<User | null | undefined> {
    return this._auth0.user$;
  }
  constructor(
    @Inject(CONFIGURATION) private _config: Options,
    @Inject(DOCUMENT) private doc: Document,
    public readonly _auth0: Auth0,
    private readonly _translate: TranslateService
  ) {
    super(_config.domainAuth0, _config.clientId);
    this._clientId = this._config.clientId;
  }

  universalLogin(): Observable<any> {
    return this._auth0.loginWithRedirect({
      authorizationParams : {
        ui_locales: this.currentLang(),
        appState: { target: '/platfrom/autenticate' }


      },

    });
  }

  /**
   * @deprecated Use universalLogin
   *  Manages the access token
   * @param body
   * @returns
   */
  isLoggedIn(body: AuthRequest) {
    if (!body) {
      return;
    }
    this._loginAuth0(body);
  }

  signUpAndLogin(newBody: SignUp) {
    const body = {
      email: newBody.email,
      password: newBody.password,
      connection: newBody.connection,
      userMetadata: newBody.user_metadata,
    };
    return this.webAuth.signupAndAuthorize(body, (r, result) => {
      console.log(result);
    });
  }

  /**
   * @deprecated
   *
   * @param body
   */
  private _loginAuth0(body: AuthRequest) {
    const auth0Params = this._dataAuthConect({
      username: body.username,
      password: body.password,
    });
    this.webAuth.login(auth0Params, (error: any, result: any) => {
      console.log(result);
      console.log(error);
    });
  }
  /**
   * @deprecated
   * @param hash
   * @returns
   */
  public handlerAuthtentication(hash: string): Observable<any> {
    const proccessHashPromise = from(this.decodeHash(hash));
    return concat(of(true), proccessHashPromise);
  }
  private decodeHash(accessToken: string) {
    return this.proccesHash(accessToken).then((result: AuthResponse) => {
      if (result) {
      }
    });
  }

  /**
   * @deprecated Use isAuthenticated$()
   * @returns
   */
  isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem(SS_JWTDATA);
    return !!accessToken;
  }

  logout(returnTo =  this.doc.location.origin ) {
    sessionStorage.clear();
    this._auth0.logout({ logoutParams: { returnTo: returnTo }});
  }

  killSessions(): void {
    this.logout();
  }
}
