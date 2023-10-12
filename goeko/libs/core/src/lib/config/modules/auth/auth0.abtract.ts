import { Router } from '@angular/router';
import { Auth0DecodedHash, Auth0Error, Auth0ParseHashError, Auth0UserProfile, WebAuth } from 'auth0-js';
import { Subject, from } from 'rxjs';
import * as jsrsasign from 'jsrsasign';
export const ACCESS_TOKEN = 'accessToken';
export const ID_TOKEN = 'idTokenData';
export const SS_JWTDATA = 'jwtData';
export abstract class Auth0Connected {
	public webAuth!: WebAuth;
	public expiresIn!: number;
	public jwtData!: any;

	private _domain: string;
	private _clientID: string;
	userData!: any;

	userInfo$ = new Subject();
	/* 	public proccesHash = (hash: string) => {
		this.webAuth.parseHash({ hash }, (error: Auth0ParseHashError | null, result: Auth0DecodedHash | null) => {
			if (error) {
				console.log('Error auth0', error);
				return;
			}

			if (result) {
				const { accessToken, idToken } = result;
				if (accessToken && idToken) {
					sessionStorage.setItem(ACCESS_TOKEN, accessToken);
					sessionStorage.setItem(ID_TOKEN, idToken);
					const jwtData = this.getUserJWTData();
					this.expiresIn = (jwtData as any).exp;
					this.getUserInfoAuth0();
				}
			}
		});
	}; */

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
		this.webAuth.crossOriginVerification();
	}
	private _connectAuth0() {
		this.webAuth = new WebAuth({
			domain: this._domain,
			clientID: this._clientID,
			responseType: 'token id_token',
		});
	}

	public proccesHash(hash: string) {
		return new Promise((resolve, reject) => {
			this.webAuth.parseHash({ hash }, (error: Auth0ParseHashError | null, result: Auth0DecodedHash | null) => {
				if (result && result.accessToken && result.idToken) {
					const jwtData = this._processJWSToken(result.idToken);
					this.expiresIn = jwtData.exp;
					resolve(jwtData);
				} else if (error) {
					throw new Error(`Error: ${error.error}. Check the console for further details.`);
				} else {
					throw new Error(`Unknown error`);
				}
			});
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
	getUserJWTData() {
		const idToken = sessionStorage.getItem('idTokenData') as string;
		console.log('idToken', idToken);
		this.jwtData = jsrsasign.KJUR.jws.JWS.parse(idToken)?.payloadObj;
		this.jwtData = {
			...this.jwtData,
			externalId: this.jwtData.sub.replace('auth0|', ''),
		};
		sessionStorage.setItem(SS_JWTDATA, window.btoa(JSON.stringify(this.jwtData)));
		return this.jwtData;
	}

	private getUserInfoAuth0() {
		const accessToken = sessionStorage.getItem('accessToken') as string;
		this.webAuth.client.userInfo(accessToken, (error: Auth0Error | null, result: Auth0UserProfile) => {
			if (error) {
				console.log('Error profile', error);
				return;
			}
			console.log('User login successfull');
			console.log(result);
			this.userData = result;
			/* 			window.location.href = `${window.location.origin}/dashboard`;
			 */
		});
	}
}
