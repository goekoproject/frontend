import { Auth0DecodedHash, Auth0ParseHashError, WebAuth } from 'auth0-js';
import * as jsrsasign from 'jsrsasign';
import { Subject } from 'rxjs';
import { SESSIONID } from './auth.constants';
export const ACCESS_TOKEN = 'accessToken';
export const SS_JWTDATA = 'jwtData';

export interface AuthResponse {
  at_hash: string;
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  externalId: string;
  iat: number;
  iss: string;
  name: string;
  nickname: string;
  nonce: string;
  picture: string;
  sub: string;
  updated_at: string;
  userType: string;
}

export abstract class Auth0Connected {
  public webAuth!: WebAuth;
  public expiresIn!: number;
  public jwtData!: any;

  private _domain: string;
  private _clientID: string;
  userData!: any;

  userInfo$ = new Subject();

  constructor(domain: string, clientId: string) {
    this._domain = domain;
    this._clientID = clientId;
    this._connectAuth0();
  }

  disconnectAuth0() {
    this.webAuth.logout({
      clientID: this._clientID,
      returnTo: `${window.location.origin}/login`,
    });
  }
  private _connectAuth0() {
    this.webAuth = new WebAuth({
      domain: this._domain,
      clientID: this._clientID,
      responseType: 'token id_token',
    });
  }

  public proccesHash(hash: string) {
    return new Promise<AuthResponse>((resolve, reject) => {
      this.webAuth.parseHash(
        { hash },
        (
          error: Auth0ParseHashError | null,
          result: Auth0DecodedHash | null
        ) => {
          if (result && result.accessToken && result.idToken) {
            const jwtData = this._processJWSToken(result.idToken);
            const jwtAccess = this._processJWSToken(result.accessToken);

            sessionStorage.setItem(SESSIONID, result.accessToken);
            const dataUser = { ...jwtData, roles: jwtAccess.permissions };
            this.expiresIn = jwtData.exp;
            resolve(dataUser);
          } else if (error) {
            throw new Error(
              `Error: ${error.error}. Check the console for further details.`
            );
          } else {
            throw new Error(`Unknown error`);
          }
        }
      );
    });
  }

  private _processJWSToken(idToken: string) {
    const payloadObj = jsrsasign.KJUR.jws.JWS.parse(idToken)?.payloadObj as any;
    if (!payloadObj) {
      return null;
    }
    return {
      ...payloadObj,
      externalId: payloadObj.sub.replace('auth0|', ''),
    };
  }
}
