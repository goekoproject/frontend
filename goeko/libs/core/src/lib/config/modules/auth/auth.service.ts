import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concat, from, of } from 'rxjs';
import { UserContextService } from '../../../user-context/user-context.service';
import { CONFIGURATION } from '../../config.module';
import { Options } from '../../models/options.interface';
import { SessionStorageService } from './../../services/session-storage.service';
import { AuthRequest } from './auth-request.interface';
import { AUTH_CONNECT, SS_JWTDATA } from './auth.constants';
import { Auth0Connected, AuthResponse } from './auth0.abtract';
import { SignUp } from './signup.interface';
import { ROLES } from '../../../roles/role-type.model';

@Injectable({ providedIn: 'platform' })
export class AuthService extends Auth0Connected {
  private _clientId: string;
  private _expirationCurrent!: number;

  private _authData$ = new BehaviorSubject<AuthResponse | null>(null);
  public get authData(): Observable<AuthResponse | null> {
    if (!this._authData$.value) {
      const sessionAuthData =
        this.sessionStorageService.getItem<AuthResponse>(SS_JWTDATA);
      this._authData$.next(sessionAuthData);
      return this._authData$.asObservable();
    }
    return this._authData$.asObservable();
  }

  public set authData(sessionAuthData: any) {
    this.sessionStorageService.setItem<AuthResponse>(
      SS_JWTDATA,
      sessionAuthData
    );
    this._authData$.next(sessionAuthData);
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
  constructor(
    @Inject(CONFIGURATION) private _config: Options,
    private readonly sessionStorageService: SessionStorageService,
    private readonly userContextService: UserContextService
  ) {
    super(_config.domainAuth0, _config.clientId);
    this._clientId = this._config.clientId;
  }

  /**
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
  public handlerAuthtentication(hash: string): Observable<any> {
    const proccessHashPromise = from(this.decodeHash(hash));
    return concat(of(true), proccessHashPromise);
  }
  private decodeHash(accessToken: string) {
    return this.proccesHash(accessToken).then((result: AuthResponse) => {
      if (result) {
        this.authData = result;
        this.userContextService.setUserContext({
          userType: result.userType,
          externalId: result.externalId,
          username: result.nickname,
          roles: result.roles?.length > 0 ? result.roles : [ROLES.PUBLIC],
        });
      }
    });
  }

  isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem(SS_JWTDATA);
    return !!accessToken && !this.isExpiredTOKEN(this.expiresIn);
  }

  logout() {
    sessionStorage.clear();
    this.disconnectAuth0();
  }

  killSessions(): void {
    this._authData$.next(null);
    this.logout();
  }
  private hasToRefresh(): boolean {
    return !this.isExpiredTOKEN(this._expirationCurrent);
  }
  /**
   * Check if the token has expired
   */
  private isExpiredTOKEN(expiration: number): boolean {
    if (expiration === -1) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);
    return expiration < now;
  }
  /**
   * Get token expiration date
   */
  private getExpirationDate(token: string): number {
    if (token && typeof token !== undefined) {
      const decodedstring: string = atob(token);
      const deserializedJSON = JSON.parse(decodedstring);
      return Number.parseInt(deserializedJSON.exp);
    } else {
      return -1;
    }
  }
}
