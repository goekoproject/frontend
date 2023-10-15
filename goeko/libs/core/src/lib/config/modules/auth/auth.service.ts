import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, concat, from, map, of, switchMap, tap } from 'rxjs';
import { CONFIGURATION } from '../../config.module';
import { Options } from '../../models/options.interface';
import { SessionStorageService } from './../../services/session-storage.service';
import { AuthRequest } from './auth-request.interface';
import { AuthResponse } from './auth-response.interface';
import { Auth0Connected } from './auth0.abtract';

export const SESSIONID = 'SESSIONID';
export const TOKEN_USER = 'TOKEN_USER';
export const SS_JWTDATA = 'jwtData';

@Injectable({ providedIn: 'platform' })
export class AuthService extends Auth0Connected {
	private _url!: string;
	private _urlTokenAccess!: string;
	private _clientId: string;
	private _clientSecret: string;
	private _authData$ = new BehaviorSubject<any | null>(null);
	private _expirationCurrent!: number;

	/********
	 *
	 * Get  data from reponse login
	 *
	 */
	public get authData(): Observable<any | null> {
		if (!this._authData$.value) {
			const sessionAuthData = this.sessionStorageService.getItem<any>(SS_JWTDATA);
			this._authData$.next(sessionAuthData);
			return this._authData$.asObservable();
		}
		return this._authData$.asObservable();
	}

	public set authData(sessionAuthData: any) {
		this.sessionStorageService.setItem<any>(SS_JWTDATA, sessionAuthData);
		this._authData$.next(sessionAuthData);
	}

	constructor(
		@Inject(CONFIGURATION) private _config: Options,
		private readonly sessionStorageService: SessionStorageService,
		private readonly _http: HttpClient,
		private router: Router
	) {
		super(_config.domainAuth0, _config.clientId);
		this._url = this._config.endopoint;
		this._urlTokenAccess = this._config.tokenAccess;
		this._clientId = this._config.clientId;
		this._clientSecret = this._config.clientSecret;
	}

	/**
	 *  Manages the access token
	 * @param body
	 * @returns
	 */
	isLoggedIn(body: AuthRequest) {
		this._loginAuth0(body);
	}
	/**
	 * Get token basic authentication credentials
	 * @param body
	 * @returns
	 */
	private _auth0(body: AuthRequest) {
		return this._loginAuth0(body);
	}

	private _loginAuth0(body: AuthRequest) {
		this.webAuth.login(
			{
				realm: 'goeko-users',
				clientID: this._clientId,
				username: body.username,
				password: body.password,
				redirectUri: `${window.location.origin}/autenticate`,
				audience: 'goeko-backend',
			},
			(error: any, result: any) => {
				console.log(result);
				console.log(error);
			}
		);
	}

	logout() {
		sessionStorage.removeItem(SESSIONID);
		sessionStorage.removeItem('idTokenData');
		sessionStorage.removeItem('jwtData');
		sessionStorage.removeItem('accessToken');
		this.disconnectAuth0();
	}

	/**
	 *  When the user try navigate what check in the credentials
	 * @returns If is login in
	 */
	isAuthenticated(): boolean {
		const accessToken = sessionStorage.getItem(SS_JWTDATA);
		return !!accessToken && !this.isExpiredTOKEN(this.expiresIn);
	}

	killSessions(): void {
		this._authData$.next(null);
		this.logout();
	}

	private hasToRefresh(): boolean {
		return !this.isExpiredTOKEN(this._expirationCurrent);
	}

	public handlerAuthtentication(hash: string): Observable<any> {
		const proccessHashPromise = from(this.decodeHash(hash));
		return concat(of(true), proccessHashPromise);
	}
	public decodeHash(accessToken: string) {
		return this.proccesHash(accessToken).then((result) => {
			if (result) {
				this.authData = result;
			}
		});
	}

	public getUserInfoToken() {
		return this.sessionStorageService.getItem('jwtData');
	}

	private _getTokenBasic(): Observable<unknown> {
		const body = this._getBodyAccessToken(this._clientId, this._clientSecret);
		return this._http.post(this._urlTokenAccess, body);
	}

	private _getBodyAccessToken(clientId: string, clientSecret: string) {
		return {
			grant_type: 'authorization_code',
			audience: 'goeko-backend',
			client_id: clientId,
			client_secret: clientSecret,
		};
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
