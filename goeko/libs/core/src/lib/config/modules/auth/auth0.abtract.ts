import { Router } from '@angular/router';
import { Auth0DecodedHash, Auth0Error, Auth0ParseHashError, Auth0UserProfile, WebAuth } from 'auth0-js';
import { Subject, from } from 'rxjs';
import * as jsrsasign from 'jsrsasign';
export const ACCESS_TOKEN = 'accessToken';
export const ID_TOKEN = 'idTokenData';

export abstract class Auth0Connected {
	public webAuth!: WebAuth;
	public expiresIn!: number;
	public jwtData!: any;

	private _domain: string;
	private _clientID: string;
	private _router: Router;
	userData!: any;

	userInfo$ = new Subject();
	public proccesHash = (hash: string) => {
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
	};

	constructor(domain: string, clientId: string, router: Router) {
		this._router = router;
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

	getUserInfo() {
		return this.userData;
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
			this._router.navigateByUrl('/dashboard');
			/* 			window.location.href = `${window.location.origin}/dashboard`;
			 */
		});
	}

	getUserJWTData() {
		const idToken = sessionStorage.getItem('idTokenData') as string;
		console.log('idToken', idToken);
		this.jwtData = jsrsasign.KJUR.jws.JWS.parse(idToken)?.payloadObj;
		this.jwtData = {
			...this.jwtData,
			externalId: this.jwtData.sub.replace('auth0|', ''),
		};
		sessionStorage.setItem('jwtData', window.btoa(JSON.stringify(this.jwtData)));
		return this.jwtData;
	}
}
