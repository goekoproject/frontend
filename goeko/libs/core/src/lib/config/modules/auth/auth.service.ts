import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { concatMap, shareReplay } from 'rxjs/operators';
import { CONFIGURATION } from '../../config.module';
import { Options } from '../../models/options.interface';
import { SessionStorageService } from './../../services/session-storage.service';
import { AuthRequest } from './auth-request.interface';
import { AuthResponse } from './auth-response.interface';

export const SESSIONID = 'SESSIONID';
export const TOKEN_USER = 'TOKEN_USER';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

@Injectable({ providedIn: 'platform' })
export class AuthService {
	private _url!: string;
	private _urlTokenAccess!: string;
	private _clientId!: string | undefined;
	private _clientSecret!: string | undefined;
	private _authData$ = new BehaviorSubject<AuthResponse | null>(null);
	private _expirationCurrent!: number;
	/********
	 *
	 * Get  data from reponse login
	 *
	 */
	public get authData(): Observable<AuthResponse | null> {
		if (!this._authData$.value) {
			const sessionAuthData = this.sessionStorageService.getItem<AuthResponse>(SESSIONID);
			this._authData$.next(sessionAuthData);
		}
		return this._authData$.asObservable();
	}

	constructor(
		@Inject(CONFIGURATION) private _config: Options,
		private readonly sessionStorageService: SessionStorageService,
		private readonly _http: HttpClient,
		private _router: Router
	) {
		this._url = this._config.endopoint;
		this._urlTokenAccess = this._config.tokenAccess;
		this._clientId = this._config.consumerKey;
		this._clientSecret = this._config.consumerSecret;
	}

	/**
	 *  Manages the access token
	 * @param body
	 * @returns
	 */
	isLoggedIn(body: AuthRequest) {
		//	this.killSessions();
		return this._auth(body);
	}

	/**
	 *  When the user try navigate what check in the credentials
	 * @returns If is login in
	 */
	isAuthenticated(): boolean {
		const accessToken = this.sessionStorageService.getItem(SESSIONID) as AuthResponse;
		return !!accessToken && !this.isExpiredTOKEN(accessToken.exp);
	}

	killSessions(): void {
		this.sessionStorageService.clearItems();
		this._authData$.next(null);
	}

	private hasToRefresh(): boolean {
		return !this.isExpiredTOKEN(this._expirationCurrent);
	}

	/**
	 * Get token basic authentication credentials
	 * @param body
	 * @returns
	 */
	private _auth(body: AuthRequest) {
		return this._getTokenBasic().pipe(concatMap((res: any) => this._login(body, res.access_token)));
	}

	private _getTokenBasic(): Observable<unknown> {
		const token = `${this._clientId}:${this._clientSecret}`;
		const hash = btoa(token);
		let headers = new HttpHeaders();
		const credentials = 'grant_type=client_credentials';
		headers = headers
			.set('Authorization', `Basic ${hash}`)
			.set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this._urlTokenAccess, credentials, {
			headers: headers,
		});
	}

	/**
	 * Method called when a users check in the credentials
	 * @param body user & password
	 * @returns
	 */
	private _login(body: AuthRequest, accessToken: string): Observable<unknown> {
		let headers = new HttpHeaders();

		headers = headers.set('Authorization', `Bearer ${accessToken}`).set('Content-Type', 'application/json');

		return from(
			new Promise((resolve) => {
				this._http
					.post<string>(this._url, body, {
						headers: headers,
						responseType: 'text' as 'json',
					})
					.pipe(shareReplay())
					.subscribe((response) => {
						if (response) {
							this._saveAccesToken(accessToken);
							this.manageToken(response);
							resolve(true);
						}
					});
			})
		);
	}
	manageTokenExternal(token: string, parkId: string) {
		this._getTokenBasic().subscribe((res: any) => {
			this._saveAccesToken(res.access_token);
			this.manageToken(token);
			const pathParkSelection = `park-selection/${parkId}`;
			this._router.navigate([pathParkSelection]);
		});
	}

	manageToken(token: string) {
		const tokenData = this._stringToTokenData(token);
		const tokenUser = this._decodeToken(token);

		this._saveToken(tokenData);
		this._saveTokenUser(tokenUser);
		const loginData = this._loginData();
		this._authData$.next(loginData);
		this._expirationCurrent = this.getExpirationDate(tokenData);
	}

	private _loginData(): AuthResponse {
		const decodeToken = this.sessionStorageService.getItem(SESSIONID) as AuthResponse;
		return decodeToken;
	}

	private _stringToTokenData(token: string): string {
		const decodeToken = token.split(' ')[1];
		return decodeToken.split('.')[1];
	}

	private _decodeToken(token: string): string {
		const decodeToken = token.split(' ')[1];
		return decodeToken;
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

	/**
	 * Called when set cookie accessToken
	 * @param token
	 */
	private _saveToken(token: string) {
		sessionStorage.setItem(SESSIONID, token);
	}

	/**
	 *  TOken for header X-Authorization
	 * @param accessToken
	 */
	private _saveTokenUser(accessToken: string) {
		sessionStorage.setItem(TOKEN_USER, accessToken);
	}

	/**
	 *  Toker for header Authorization
	 * @param accessToken
	 */
	private _saveAccesToken(accessToken: string) {
		sessionStorage.setItem(ACCESS_TOKEN, accessToken);
	}
}