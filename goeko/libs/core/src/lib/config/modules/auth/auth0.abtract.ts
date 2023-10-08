import { Auth0DecodedHash, Auth0Error, Auth0ParseHashError, Auth0UserProfile, WebAuth } from 'auth0-js';
import { Subject } from 'rxjs';

export abstract class Auth0Connected {
	public webAuth!: WebAuth;
	public expiresIn!: number;

	public proccesHash = (hash: string) => {
		this.webAuth.parseHash({ hash }, (error: Auth0ParseHashError | null, result: Auth0DecodedHash | null) => {
			if (error) {
				console.log('Error auth0', error);
				return;
			}

			if (result) {
				const { accessToken, expiresIn } = result;
				if (accessToken && expiresIn) {
					this.expiresIn = expiresIn;
					sessionStorage.setItem('accessToken', accessToken);
					sessionStorage.setItem('expiresIn', expiresIn?.toString());
					console.log(accessToken);
					this.webAuth.client.userInfo(accessToken, (error: Auth0Error | null, result: Auth0UserProfile) => {
						if (error) {
							console.log('Error profile', error);
							return;
						}

						console.log('User login successfull');
						console.log(result);
					});
					window.location.href = `${window.location.origin}/dashboard`;
				}
			}
		});
	};

	constructor(domain: string, clientId: string) {
		this._connectAuth0(domain, clientId);
	}

	private _connectAuth0(domain: string, clientId: string) {
		this.webAuth = new WebAuth({
			domain: domain,
			clientID: clientId,
			responseType: 'token',
		});
	}
}
